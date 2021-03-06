# Copyright (C) 2020 Intel Corporation
#
# SPDX-License-Identifier: MIT

import math
from enum import Enum
from io import BytesIO

import numpy as np
from PIL import Image

from cvat.apps.engine.media_extractors import VideoReader, ZipReader
from cvat.apps.engine.mime_types import mimetypes
from cvat.apps.engine.models import DataChoice
import time

class RandomAccessIterator:
    def __init__(self, iterable):
        self.iterable = iterable
        self.iterator = None
        self.pos = -1

    def __iter__(self):
        return self

    def __next__(self):
        return self[self.pos + 1]

    def __getitem__(self, idx):
        assert 0 <= idx
        if self.iterator is None or idx <= self.pos:
            self.reset()
        v = None
        while self.pos < idx:
            # NOTE: don't keep the last item in self, it can be expensive
            v = next(self.iterator)
            self.pos += 1
        return v

    def reset(self):
        self.iterator = iter(self.iterable)
        self.pos = -1

class FrameProvider:
    class Quality(Enum):
        COMPRESSED = 0
        ORIGINAL = 100

    class Type(Enum):
        BUFFER = 0
        PIL = 1
        NUMPY_ARRAY = 2

    class ChunkLoader:
        def __init__(self, reader_class, path_getter):
            self.chunk_id = None
            self.chunk_reader = None
            self.reader_class = reader_class
            self.get_chunk_path = path_getter

        def load(self, chunk_id):
            if self.chunk_id != chunk_id:
                self.chunk_id = chunk_id
                self.chunk_reader = RandomAccessIterator(
                    self.reader_class([self.get_chunk_path(chunk_id)]))
            return self.chunk_reader

    def __init__(self, db_data):
        self._db_data = db_data
        self._loaders = {}

        reader_class = {
            DataChoice.IMAGESET: ZipReader,
            DataChoice.VIDEO: VideoReader,
        }
        self._loaders[self.Quality.COMPRESSED] = self.ChunkLoader(
            reader_class[db_data.compressed_chunk_type],
            db_data.get_compressed_chunk_path)
        self._loaders[self.Quality.ORIGINAL] = self.ChunkLoader(
            reader_class[db_data.original_chunk_type],
            db_data.get_original_chunk_path)

    def __len__(self):
        return self._db_data.size

    def _validate_frame_number(self, frame_number):
        frame_number_ = int(frame_number)
        if frame_number_ < 0 or frame_number_ >= self._db_data.size:
            raise Exception('Incorrect requested frame number: {}'.format(frame_number_))

        chunk_number = frame_number_ // self._db_data.chunk_size
        frame_offset = frame_number_ % self._db_data.chunk_size

        return frame_number_, chunk_number, frame_offset

    def _validate_chunk_number(self, chunk_number):
        chunk_number_ = int(chunk_number)
        if chunk_number_ < 0 or chunk_number_ >= math.ceil(self._db_data.size / self._db_data.chunk_size):
            raise Exception('requested chunk does not exist')

        return chunk_number_

    @staticmethod
    def _av_frame_to_png_bytes(av_frame):
        pil_img = av_frame.to_image()
        buf = BytesIO()
        pil_img.save(buf, format='PNG')
        buf.seek(0)
        return buf

    def _get_frame(self, frame_number, chunk_path_getter, extracted_chunk, chunk_reader, reader_class):
        _, chunk_number, frame_offset = self._validate_frame_number(frame_number)
        chunk_path = chunk_path_getter(chunk_number)
        if chunk_number != extracted_chunk:
            extracted_chunk = chunk_number
            chunk_reader = reader_class([chunk_path])

        frame, frame_name, _  = next(itertools.islice(chunk_reader, frame_offset, None))
        if reader_class is VideoReader:
            return (self._av_frame_to_png_bytes(frame), 'image/png')

        return (frame, mimetypes.guess_type(frame_name))

    def _get_frames(self, chunk_path_getter, reader_class, out_type):
        for chunk_idx in range(math.ceil(self._db_data.size / self._db_data.chunk_size)):
            chunk_path = chunk_path_getter(chunk_idx)
            chunk_reader = reader_class([chunk_path])
            for frame, _, _ in chunk_reader:
                if out_type == self.Type.BUFFER:
                    yield self._av_frame_to_png_bytes(frame) if reader_class is VideoReader else frame
                elif out_type == self.Type.PIL:
                    yield frame.to_image() if reader_class is VideoReader else Image.open(frame)
                elif out_type == self.Type.NUMPY_ARRAY:
                    if reader_class is VideoReader:
                        image = np.array(frame.to_image())
                    else:
                        image = np.array(Image.open(frame))
                    if len(image.shape) == 3 and image.shape[2] in {3, 4}:
                        image[:, :, :3] = image[:, :, 2::-1] # RGB to BGR
                    yield image
                else:
                    raise Exception('unsupported output type')

    def _convert_frame(self, frame, reader_class, out_type):
        if out_type == self.Type.BUFFER:
            return self._av_frame_to_png_bytes(frame) if reader_class is VideoReader else frame
        elif out_type == self.Type.PIL:
            return frame.to_image() if reader_class is VideoReader else Image.open(frame)
        elif out_type == self.Type.NUMPY_ARRAY:
            if reader_class is VideoReader:
                image = np.array(frame.to_image())
            else:
                image = np.array(Image.open(frame))
            if len(image.shape) == 3 and image.shape[2] in {3, 4}:
                image[:, :, :3] = image[:, :, 2::-1] # RGB to BGR
            return image
        else:
            raise Exception('unsupported output type')

    def get_preview(self):
        return self._db_data.get_preview_path()

    def get_chunk(self, chunk_number, quality=Quality.ORIGINAL):
        chunk_number = self._validate_chunk_number(chunk_number)
        return self._loaders[quality].get_chunk_path(chunk_number)

    def get_frame(self, frame_number, quality=Quality.ORIGINAL,
            out_type=Type.BUFFER):
        _, chunk_number, frame_offset = self._validate_frame_number(frame_number)
        loader = self._loaders[quality]
        chunk_reader = loader.load(chunk_number)
        frame, frame_name, _ = chunk_reader[frame_offset]

        frame = self._convert_frame(frame, loader.reader_class, out_type)
        if loader.reader_class is VideoReader:
            return (frame, 'image/png')
        return (frame, mimetypes.guess_type(frame_name))

    def get_frames(self, quality=Quality.ORIGINAL, out_type=Type.BUFFER):
        for idx in range(self._db_data.size):
            yield self.get_frame(idx, quality=quality, out_type=out_type)

    def current_milli_time(self):
        return int(round(time.time() * 1000))

    def get_frames_improved(self, frame_start, frame_end,quality=Quality.ORIGINAL,out_type=Type.BUFFER,skip=1):
        frames = []
        loader = self._loaders[quality]

        _, chunk_number, frame_offset = self._validate_frame_number(frame_start)
        chunk_reader = loader.load(chunk_number)

        chunk_number_start = chunk_number
        print('frame start:',frame_start)
        print('end: ',frame_end)
        i=frame_start
        print('i',i)
        start_while = self.current_milli_time()
        print('start while',start_while)
        while(i<frame_end+1):
            while(chunk_number == chunk_number_start and i<frame_end+1):
                frame, frame_name, _ = chunk_reader[frame_offset]
                start_convert = self.current_milli_time()
                frame = self._convert_frame(frame, loader.reader_class, out_type)
                print('convert time',self.current_milli_time()-start_convert)
                frames.append(frame)
                i+=skip
                _, chunk_number, frame_offset = self._validate_frame_number(i)
                print('i',i)
            chunk_number_start = chunk_number
            chunk_reader = loader.load(chunk_number)
            print('LOAD CHUNK')
        print('end while',self.current_milli_time()-start_while)
        print('frames length: ',len(frames))
        return frames

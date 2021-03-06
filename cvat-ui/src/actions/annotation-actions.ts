// Copyright (C) 2020 Intel Corporation
//
// SPDX-License-Identifier: MIT

import {
    AnyAction,
    Dispatch,
    ActionCreator,
    Store,
} from 'redux';
import { ThunkAction } from 'redux-thunk';

import {
    CombinedState,
    ActiveControl,
    ShapeType,
    ObjectType,
    Task,
    FrameSpeed,
    Rotation,
    ContextMenuType,
    Workspace,
} from 'reducers/interfaces';

import getCore from 'cvat-core-wrapper';
import logger, { LogType } from 'cvat-logger';
import { RectDrawingMethod } from 'cvat-canvas-wrapper';
import { getCVATStore } from 'cvat-store';
import { object } from 'prop-types';

interface AnnotationsParameters {
    filters: string[];
    frame: number;
    showAllInterpolationTracks: boolean;
    jobInstance: any;
}

const cvat = getCore();
let store: null | Store<CombinedState> = null;

function getStore(): Store<CombinedState> {
    if (store === null) {
        store = getCVATStore();
    }
    return store;
}

function receiveAnnotationsParameters(): AnnotationsParameters {
    if (store === null) {
        store = getCVATStore();
    }

    const state: CombinedState = getStore().getState();
    const {
        annotation: {
            annotations: {
                filters,
            },
            player: {
                frame: {
                    number: frame,
                },
            },
            job: {
                instance: jobInstance,
            },
        },
        settings: {
            workspace: {
                showAllInterpolationTracks,
            },
        },
    } = state;

    return {
        filters,
        frame,
        jobInstance,
        showAllInterpolationTracks,
    };
}

export function computeZRange(states: any[]): number[] {
    const filteredStates = states.filter((state: any): any => state.objectType !== ObjectType.TAG);
    let minZ = filteredStates.length ? filteredStates[0].zOrder : 0;
    let maxZ = filteredStates.length ? filteredStates[0].zOrder : 0;
    filteredStates.forEach((state: any): void => {
        minZ = Math.min(minZ, state.zOrder);
        maxZ = Math.max(maxZ, state.zOrder);
    });

    return [minZ, maxZ];
}

async function jobInfoGenerator(job: any): Promise<Record<string, number>> {
    const { total } = await job.annotations.statistics();
    return {
        'frame count': job.stopFrame - job.startFrame + 1,
        'track count': total.rectangle.shape + total.rectangle.track
            + total.polygon.shape + total.polygon.track
            + total.polyline.shape + total.polyline.track
            + total.points.shape + total.points.track
            + total.cuboid.shape + total.cuboid.track,
        'object count': total.total,
        'box count': total.rectangle.shape + total.rectangle.track,
        'polygon count': total.polygon.shape + total.polygon.track,
        'polyline count': total.polyline.shape + total.polyline.track,
        'points count': total.points.shape + total.points.track,
        'cuboids count': total.cuboid.shape + total.cuboid.track,
        'tag count': total.tags,
    };
}

export enum AnnotationActionTypes {
    GET_JOB = 'GET_JOB',
    GET_JOB_SUCCESS = 'GET_JOB_SUCCESS',
    GET_JOB_FAILED = 'GET_JOB_FAILED',
    CLOSE_JOB = 'CLOSE_JOB',
    CHANGE_FRAME = 'CHANGE_FRAME',
    CHANGE_FRAME_SUCCESS = 'CHANGE_FRAME_SUCCESS',
    CHANGE_FRAME_FAILED = 'CHANGE_FRAME_FAILED',
    SAVE_ANNOTATIONS = 'SAVE_ANNOTATIONS',
    SAVE_ANNOTATIONS_SUCCESS = 'SAVE_ANNOTATIONS_SUCCESS',
    SAVE_ANNOTATIONS_FAILED = 'SAVE_ANNOTATIONS_FAILED',
    SAVE_UPDATE_ANNOTATIONS_STATUS = 'SAVE_UPDATE_ANNOTATIONS_STATUS',
    SWITCH_PLAY = 'SWITCH_PLAY',
    CONFIRM_CANVAS_READY = 'CONFIRM_CANVAS_READY',
    DRAG_CANVAS = 'DRAG_CANVAS',
    ZOOM_CANVAS = 'ZOOM_CANVAS',
    MERGE_OBJECTS = 'MERGE_OBJECTS',
    GROUP_OBJECTS = 'GROUP_OBJECTS',
    SPLIT_TRACK = 'SPLIT_TRACK',
    COPY_SHAPE = 'COPY_SHAPE',
    PASTE_SHAPE = 'PASTE_SHAPE',
    EDIT_SHAPE = 'EDIT_SHAPE',
    REPEAT_DRAW_SHAPE = 'REPEAT_DRAW_SHAPE',
    SHAPE_DRAWN = 'SHAPE_DRAWN',
    RESET_CANVAS = 'RESET_CANVAS',
    REMEMBER_CREATED_OBJECT = 'REMEMBER_CREATED_OBJECT',
    UPDATE_ANNOTATIONS_SUCCESS = 'UPDATE_ANNOTATIONS_SUCCESS',
    UPDATE_ANNOTATIONS_FAILED = 'UPDATE_ANNOTATIONS_FAILED',
    CREATE_ANNOTATIONS_SUCCESS = 'CREATE_ANNOTATIONS_SUCCESS',
    CREATE_ANNOTATIONS_FAILED = 'CREATE_ANNOTATIONS_FAILED',
    MERGE_ANNOTATIONS_SUCCESS = 'MERGE_ANNOTATIONS_SUCCESS',
    MERGE_ANNOTATIONS_FAILED = 'MERGE_ANNOTATIONS_FAILED',
    RESET_ANNOTATIONS_GROUP = 'RESET_ANNOTATIONS_GROUP',
    GROUP_ANNOTATIONS = 'GROUP_ANNOTATIONS',
    GROUP_ANNOTATIONS_SUCCESS = 'GROUP_ANNOTATIONS_SUCCESS',
    GROUP_ANNOTATIONS_FAILED = 'GROUP_ANNOTATIONS_FAILED',
    SPLIT_ANNOTATIONS_SUCCESS = 'SPLIT_ANNOTATIONS_SUCCESS',
    SPLIT_ANNOTATIONS_FAILED = 'SPLIT_ANNOTATIONS_FAILED',
    CHANGE_LABEL_COLOR_SUCCESS = 'CHANGE_LABEL_COLOR_SUCCESS',
    CHANGE_LABEL_COLOR_FAILED = 'CHANGE_LABEL_COLOR_FAILED',
    UPDATE_TAB_CONTENT_HEIGHT = 'UPDATE_TAB_CONTENT_HEIGHT',
    COLLAPSE_SIDEBAR = 'COLLAPSE_SIDEBAR',
    COLLAPSE_APPEARANCE = 'COLLAPSE_APPEARANCE',
    COLLAPSE_OBJECT_ITEMS = 'COLLAPSE_OBJECT_ITEMS',
    ACTIVATE_OBJECT = 'ACTIVATE_OBJECT',
    SELECT_OBJECTS = 'SELECT_OBJECTS',
    REMOVE_OBJECT_SUCCESS = 'REMOVE_OBJECT_SUCCESS',
    REMOVE_OBJECT_FAILED = 'REMOVE_OBJECT_FAILED',
    PROPAGATE_OBJECT = 'PROPAGATE_OBJECT',
    PROPAGATE_OBJECT_SUCCESS = 'PROPAGATE_OBJECT_SUCCESS',
    PROPAGATE_OBJECT_FAILED = 'PROPAGATE_OBJECT_FAILED',
    CHANGE_PROPAGATE_FRAMES = 'CHANGE_PROPAGATE_FRAMES',
    SWITCH_SHOWING_STATISTICS = 'SWITCH_SHOWING_STATISTICS',
    COLLECT_STATISTICS = 'COLLECT_STATISTICS',
    COLLECT_STATISTICS_SUCCESS = 'COLLECT_STATISTICS_SUCCESS',
    COLLECT_STATISTICS_FAILED = 'COLLECT_STATISTICS_FAILED',
    CHANGE_JOB_STATUS = 'CHANGE_JOB_STATUS',
    CHANGE_JOB_STATUS_SUCCESS = 'CHANGE_JOB_STATUS_SUCCESS',
    CHANGE_JOB_STATUS_FAILED = 'CHANGE_JOB_STATUS_FAILED',
    UPLOAD_JOB_ANNOTATIONS = 'UPLOAD_JOB_ANNOTATIONS',
    UPLOAD_JOB_ANNOTATIONS_SUCCESS = 'UPLOAD_JOB_ANNOTATIONS_SUCCESS',
    UPLOAD_JOB_ANNOTATIONS_FAILED = 'UPLOAD_JOB_ANNOTATIONS_FAILED',
    REMOVE_JOB_ANNOTATIONS_SUCCESS = 'REMOVE_JOB_ANNOTATIONS_SUCCESS',
    REMOVE_JOB_ANNOTATIONS_FAILED = 'REMOVE_JOB_ANNOTATIONS_FAILED',
    UPDATE_CANVAS_CONTEXT_MENU = 'UPDATE_CANVAS_CONTEXT_MENU',
    UNDO_ACTION_SUCCESS = 'UNDO_ACTION_SUCCESS',
    UNDO_ACTION_FAILED = 'UNDO_ACTION_FAILED',
    REDO_ACTION_SUCCESS = 'REDO_ACTION_SUCCESS',
    REDO_ACTION_FAILED = 'REDO_ACTION_FAILED',
    CHANGE_ANNOTATIONS_FILTERS = 'CHANGE_ANNOTATIONS_FILTERS',
    FETCH_ANNOTATIONS_SUCCESS = 'FETCH_ANNOTATIONS_SUCCESS',
    FETCH_ANNOTATIONS_FAILED = 'FETCH_ANNOTATIONS_FAILED',
    ROTATE_FRAME = 'ROTATE_FRAME',
    SWITCH_Z_LAYER = 'SWITCH_Z_LAYER',
    ADD_Z_LAYER = 'ADD_Z_LAYER',
    SEARCH_ANNOTATIONS_FAILED = 'SEARCH_ANNOTATIONS_FAILED',
    CHANGE_WORKSPACE = 'CHANGE_WORKSPACE',
    SAVE_LOGS_SUCCESS = 'SAVE_LOGS_SUCCESS',
    SAVE_LOGS_FAILED = 'SAVE_LOGS_FAILED',
    // ISL MANUAL TRACKING
    SWITCH_TRACKING = 'SWITCH_TRACKING',
    // ISL END
    // ISL AUTOFIT
    START_AUTO_FIT = 'START_AUTO_FIT',
    STOP_AUTO_FIT = 'STOP_AUTO_FIT',
    // ISL END
    // ISL INTERPOLATION
    START_COPY_LAST_KEYFRAME = 'START_COPY_LAST_KEYFRAME',
    STOP_COPY_LAST_KEYFRAME = 'STOP_COPY_LAST_KEYFRAME',
    // ISL GLOBAL ATTRIBUTES
    EDIT_GLOBAL_ATTRIBUTES = 'EDIT_GLOBAL_ATTRIBUTES',
    START_EDIT_LABEL = 'START_EDIT_LABEL',
    STOP_EDIT_LABEL = 'STOP_EDIT_LABEL',
    SET_ATTRIBUTE_VISIBILITY = 'SET_ATTRIBUTE_VISIBILITY',
    START_SAVE_ATTRIBUTES = 'START_SAVE_ATTRIBUTES',
    STOP_SAVE_ATRIBUTES = 'STOP_SAVE_ATRIBUTES',
    START_FETCH_ATTRIBUTES = 'START_FETCH_ATTRIBUTES',
    STOP_FETCH_ATTRIBUTES = 'STOP_FETCH_ATTRIBUTES',
    // ISL END
    // ISL TRACKING
    START_TRACK = 'START_TRACK',
    STOP_TRACK= 'STOP_TRACK',
    SWITCH_AUTO_TRACK = 'SWITCH_AUTO_TRACK',
    SWITCH_AUTO_TRACK_MODAL = 'SWITCH_AUTO_TRACK_MODAL',
    CHANGE_NUM_FRAMES_TO_TRACK = 'CHANGE_NUM_FRAMES_TO_TRACK',
    GET_FRAME = 'GET_FRAME',
    SWITCH_CURRENT_DISPLAY = 'SWITCH_CURRENT_DISPLAY', //next track checkpoint
    PREVIOUS_TRACK = 'PREVIOUS_TRACK',
    EDIT_LAST_TRACK_STATE = 'EDIT_LAST_TRACK_STATE',
    // ISL END
}

// ISL MANUAL TRACKING
export function switchTracking(tracking: boolean, trackedStateID: number | null): AnyAction {
    return {
        type: AnnotationActionTypes.SWITCH_TRACKING,
        payload: {
            tracking,
            trackedStateID,
        },
    };
}
// ISL END

// ISL TRACKING
export function fetch(jobInstance: any, url:string, params:any): AnyAction {
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        try {
            jobInstance.annotations.fetch(url,params).then((data: any) => {
                console.log('data from server: ',data);
                dispatch({
                    type: AnnotationActionTypes.GET_FRAME,
                    payload: {
                        image: data,
                    },
                });
            });
        } catch (error) {
            console.log('Error Occured While Fetching', error);
        }
    };
}

export function changeNumFramesToTrack(num_frames:number): AnyAction {
    return {
        type: AnnotationActionTypes.CHANGE_NUM_FRAMES_TO_TRACK,
        payload: {
            num_frames: num_frames,
        },
    };
}
export function switchTrackModalVisibility(visibility:boolean,jobInstance:any, frame_num:number,sourceState:any): AnyAction {
    return {
        type: AnnotationActionTypes.SWITCH_AUTO_TRACK_MODAL,
        payload: {
            visibility: visibility,
            jobInstance:jobInstance,
            frame_num:frame_num,
            sourceState:sourceState,
        },
    };
}
export function switchAutoTrack(status:boolean): AnyAction {
    return {
        type: AnnotationActionTypes.SWITCH_AUTO_TRACK,
        payload: {
            status: status,
        },
    };
}

export function track(jobInstance:any,objectState:any,frameStart:number,frameEnd:number,mode:string = 'OVERRIDE',lastPoints:number[]=[]): AnyAction {
    // if mode == 'OVERRIDE', all of the previous states to be tracked will be deleted
    // if mode == 'APPEND', new tracking states will be added on the end of the list
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        try {
            let points:number[] = [];
            if(lastPoints.length > 0){
                points = lastPoints;
            }else {
                points = objectState.points;
            }
            jobInstance.annotations.tracking(objectState.clientID,frameStart,frameEnd,points).then((data: any) => {
                console.log('data received from server: ', data.tracker_coords);
                dispatch({
                    type: AnnotationActionTypes.START_TRACK,
                    payload: {
                        statesToUpdate:data.tracker_coords,
                        tracking:false,
                        from: frameStart,
                        clientID:objectState.clientID,
                        mode: mode,
                    },
                });
                dispatch(changeCurrentDisplay(frameEnd));
            });
        } catch (error) {
            console.log('Error occured while tracking.', error);

        }
    };
};

export function changeCurrentDisplay(frame_num:number): AnyAction {
    return {
        type: AnnotationActionTypes.SWITCH_CURRENT_DISPLAY,
        payload: {
            current: frame_num,
        },
    };
}

export function previousTrack(): AnyAction {
    return {
        type: AnnotationActionTypes.PREVIOUS_TRACK,
        payload: {

        },
    };
}
export function editLastTrackState(drag:any,resize:any): AnyAction {
    return {
        type: AnnotationActionTypes.EDIT_LAST_TRACK_STATE,
        payload: {
            drag: drag,
            resize: resize,
        },
    };
}
// ISL END

// ISL AUTOFIT
export function autoFit(jobInstance: any, stateToFit: any, frame: number): AnyAction {
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        try {
            const state = stateToFit;
            dispatch({
                type: AnnotationActionTypes.START_AUTO_FIT,
                payload: {
                    clientID: state.clientID,
                },
            });
            jobInstance.annotations.autoFit(frame, state.points).then((data: any) => {
                stateToFit.points = data.points;
                dispatch(updateAnnotationsAsync([stateToFit]));
                dispatch({
                    type: AnnotationActionTypes.STOP_AUTO_FIT,
                    payload: {
                        clientID: state.clientID,
                    },
                });
            });
        } catch (error) {
            console.log('Error Occured While Fitting', error);
            const state = stateToFit;
            dispatch({
                type: AnnotationActionTypes.STOP_AUTO_FIT,
                payload: {
                    clientID: state.clientID,
                },
            });
        }
    };
}
// ISL END

// ISL INTERPOLATION
export function asLastKeyframe(jobInstance: any, stateToFit: any, frame: number): AnyAction {
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        try {
            const state = stateToFit;
            const stateA: CombinedState = getStore().getState();
            const { instance: job } = stateA.annotation.job;
            const { filters, frame, showAllInterpolationTracks } = receiveAnnotationsParameters();
            const {prev} = state.keyframes;
            const states = await job.annotations.get(prev, showAllInterpolationTracks, filters);
            // console.log(stateA);
            // console.log(states);
            // console.log(state);
            // console.log(states[0]);
            dispatch({
                type: AnnotationActionTypes.START_COPY_LAST_KEYFRAME,
                payload: {
                    clientID: state.clientID,
                },
            });

            console.log(jobInstance);
            // jobInstance.annotations.asLastKeyframe(frame, state.points).then((data: any) => {
                stateToFit.points = states[state.clientID - 1].points;
                dispatch(updateAnnotationsAsync([stateToFit]));
                dispatch({
                    type: AnnotationActionTypes.STOP_COPY_LAST_KEYFRAME,
                    payload: {
                        clientID: state.clientID,
                    },
                });
            // });
        } catch (error) {
            console.log('Error Occured While Copying Last Keyframe', error);
            const state = stateToFit;
            dispatch({
                type: AnnotationActionTypes.STOP_COPY_LAST_KEYFRAME,
                payload: {
                    clientID: state.clientID,
                },
            });
        }
    };
}
// ISL END

// ISL GLOBAL ATTRIBUTES
export function setGlobalAttributesVisibility(visibility:boolean): AnyAction {
    return {
        type: AnnotationActionTypes.SET_ATTRIBUTE_VISIBILITY,
        payload: {
            visibility:visibility,
        },

    };
}
export function editGlobalAttributes(globalAttributes:any): AnyAction {
    return {
        type: AnnotationActionTypes.EDIT_GLOBAL_ATTRIBUTES,
        payload: {
            globalAttributes:globalAttributes,
        },
    };
}
export function okGlobalAttributes(globalAttributes:any): AnyAction {
    return {
        type: AnnotationActionTypes.EDIT_GLOBAL_ATTRIBUTES,
        payload: {
            globalAttributes:globalAttributes,
            visibility:false,
        },
    };
}
export function editLabels(jobInstance: any,labels_data:any ,selected:any): AnyAction {
    // console.log('Editing label for task ',jobInstance.task.id);
    // console.log('attributes: ', labels_data);
    // console.log('selected: ', selected);
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        try {
            dispatch({
                type: AnnotationActionTypes.START_EDIT_LABEL,
                payload: {
                    task_id: jobInstance.task.id,
                    data:labels_data,
                    status: true,
                },
            });
            // console.log(jobInstance);
            jobInstance.annotations.updateLabels(labels_data,selected).then((data: any) => {
                // console.log('data received from server: ', data);
                dispatch({
                    type: AnnotationActionTypes.STOP_EDIT_LABEL,
                    payload: {
                        task_id: jobInstance.task.id,
                        data:labels_data,
                    },
                });
            });
        } catch (error) {
            console.log('Error Occured While editing labels', error);

        }
    };
};
export function fetchAttributes(jobInstance: any): AnyAction {
    // console.log('Editing label for task ',jobInstance.task.id);
    // console.log('attributes: ', labels_data);
    // console.log('selected: ', selected);
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        try {
            dispatch({
                type: AnnotationActionTypes.START_FETCH_ATTRIBUTES,
                payload: {
                    task_id: jobInstance.task.id,
                },
            });
            // console.log(jobInstance);
            jobInstance.annotations.fetchAttributes().then((data: any) => {
                // console.log('MARKER data fetched: ', data);
                dispatch({
                    type: AnnotationActionTypes.STOP_FETCH_ATTRIBUTES,
                    payload: {
                        data:data,
                    },
                });
            });
        } catch (error) {
            console.log('Error Occured While editing labels', error);

        }
    };
};
export function saveAttributes(jobInstance: any,attributes:any,selected:any): AnyAction {
    // console.log('Editing label for task ',jobInstance.task.id);
    // console.log('attributes: ', labels_data);
    // console.log('selected: ', selected);
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        try {
            dispatch({
                type: AnnotationActionTypes.START_SAVE_ATTRIBUTES,
                payload: {
                    task_id: jobInstance.task.id,
                },
            });
            // console.log(jobInstance);
            jobInstance.annotations.saveAttributes(attributes,selected).then((data: any) => {
                console.log('MARKER data fetched: ', data);
                dispatch({
                    type: AnnotationActionTypes.STOP_SAVE_ATRIBUTES,
                    payload: {
                        task_id: jobInstance.task.id,
                    },
                });
            });
        } catch (error) {
            console.log('Error Occured While editing labels', error);

        }
    };
};
//ISL END
export function saveLogsAsync():
    ThunkAction<Promise<void>, {}, {}, AnyAction> {
    return async (dispatch: ActionCreator<Dispatch>) => {
        try {
            await logger.save();
            dispatch({
                type: AnnotationActionTypes.SAVE_LOGS_SUCCESS,
                payload: {},
            });
        } catch (error) {
            dispatch({
                type: AnnotationActionTypes.SAVE_LOGS_FAILED,
                payload: {
                    error,
                },
            });
        }
    };
}

export function changeWorkspace(workspace: Workspace): AnyAction {
    return {
        type: AnnotationActionTypes.CHANGE_WORKSPACE,
        payload: {
            workspace,
        },
    };
}

export function addZLayer(): AnyAction {
    return {
        type: AnnotationActionTypes.ADD_Z_LAYER,
        payload: {},
    };
}

export function switchZLayer(cur: number): AnyAction {
    return {
        type: AnnotationActionTypes.SWITCH_Z_LAYER,
        payload: {
            cur,
        },
    };
}

export function fetchAnnotationsAsync(): ThunkAction<Promise<void>, {}, {}, AnyAction> {
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        try {
            const {
                filters,
                frame,
                showAllInterpolationTracks,
                jobInstance,
            } = receiveAnnotationsParameters();
            const states = await jobInstance.annotations
                .get(frame, showAllInterpolationTracks, filters);
            const [minZ, maxZ] = computeZRange(states);

            dispatch({
                type: AnnotationActionTypes.FETCH_ANNOTATIONS_SUCCESS,
                payload: {
                    states,
                    minZ,
                    maxZ,
                },
            });
        } catch (error) {
            dispatch({
                type: AnnotationActionTypes.FETCH_ANNOTATIONS_FAILED,
                payload: {
                    error,
                },
            });
        }
    };
}

export function changeAnnotationsFilters(filters: string[]): AnyAction {
    const state: CombinedState = getStore().getState();
    const { filtersHistory, filters: oldFilters } = state.annotation.annotations;

    filters.forEach((element: string) => {
        if (!(filtersHistory.includes(element) || oldFilters.includes(element))) {
            filtersHistory.push(element);
        }
    });

    window.localStorage.setItem('filtersHistory', JSON.stringify(filtersHistory.slice(-10)));

    return {
        type: AnnotationActionTypes.CHANGE_ANNOTATIONS_FILTERS,
        payload: {
            filters,
            filtersHistory: filtersHistory.slice(-10),
        },
    };
}

export function updateCanvasContextMenu(
    visible: boolean,
    left: number,
    top: number,
    pointID: number | null = null,
    type?: ContextMenuType,
): AnyAction {
    return {
        type: AnnotationActionTypes.UPDATE_CANVAS_CONTEXT_MENU,
        payload: {
            visible,
            left,
            top,
            type,
            pointID,
        },
    };
}

export function removeAnnotationsAsync(sessionInstance: any):
    ThunkAction<Promise<void>, {}, {}, AnyAction> {
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        try {
            await sessionInstance.annotations.clear();
            await sessionInstance.actions.clear();
            const history = await sessionInstance.actions.get();

            dispatch({
                type: AnnotationActionTypes.REMOVE_JOB_ANNOTATIONS_SUCCESS,
                payload: {
                    history,
                },
            });
        } catch (error) {
            dispatch({
                type: AnnotationActionTypes.REMOVE_JOB_ANNOTATIONS_FAILED,
                payload: {
                    error,
                },
            });
        }
    };
}

export function uploadJobAnnotationsAsync(job: any, loader: any, file: File):
    ThunkAction<Promise<void>, {}, {}, AnyAction> {
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        try {
            const state: CombinedState = getStore().getState();
            const { filters, showAllInterpolationTracks } = receiveAnnotationsParameters();

            if (state.tasks.activities.loads[job.task.id]) {
                throw Error('Annotations is being uploaded for the task');
            }
            if (state.annotation.activities.loads[job.id]) {
                throw Error('Only one uploading of annotations for a job allowed at the same time');
            }

            dispatch({
                type: AnnotationActionTypes.UPLOAD_JOB_ANNOTATIONS,
                payload: {
                    job,
                    loader,
                },
            });

            const frame = state.annotation.player.frame.number;
            await job.annotations.upload(file, loader);

            await job.logger.log(
                LogType.uploadAnnotations, {
                ...(await jobInfoGenerator(job)),
            },
            );

            await job.annotations.clear(true);
            await job.actions.clear();
            const history = await job.actions.get();

            // One more update to escape some problems
            // in canvas when shape with the same
            // clientID has different type (polygon, rectangle) for example
            dispatch({
                type: AnnotationActionTypes.UPLOAD_JOB_ANNOTATIONS_SUCCESS,
                payload: {
                    job,
                    states: [],
                    history,
                },
            });

            const states = await job.annotations.get(frame, showAllInterpolationTracks, filters);

            setTimeout(() => {
                dispatch({
                    type: AnnotationActionTypes.UPLOAD_JOB_ANNOTATIONS_SUCCESS,
                    payload: {
                        history,
                        job,
                        states,
                    },
                });
            });
        } catch (error) {
            dispatch({
                type: AnnotationActionTypes.UPLOAD_JOB_ANNOTATIONS_FAILED,
                payload: {
                    job,
                    error,
                },
            });
        }
    };
}

export function changeJobStatusAsync(jobInstance: any, status: string):
    ThunkAction<Promise<void>, {}, {}, AnyAction> {
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        const oldStatus = jobInstance.status;
        try {
            dispatch({
                type: AnnotationActionTypes.CHANGE_JOB_STATUS,
                payload: {},
            });

            // eslint-disable-next-line no-param-reassign
            jobInstance.status = status;
            await jobInstance.save();

            dispatch({
                type: AnnotationActionTypes.CHANGE_JOB_STATUS_SUCCESS,
                payload: {},
            });
        } catch (error) {
            // eslint-disable-next-line no-param-reassign
            jobInstance.status = oldStatus;
            dispatch({
                type: AnnotationActionTypes.CHANGE_JOB_STATUS_FAILED,
                payload: {
                    error,
                },
            });
        }
    };
}

export function collectStatisticsAsync(sessionInstance: any):
    ThunkAction<Promise<void>, {}, {}, AnyAction> {
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        try {
            dispatch({
                type: AnnotationActionTypes.COLLECT_STATISTICS,
                payload: {},
            });

            const data = await sessionInstance.annotations.statistics();

            dispatch({
                type: AnnotationActionTypes.COLLECT_STATISTICS_SUCCESS,
                payload: {
                    data,
                },
            });
        } catch (error) {
            dispatch({
                type: AnnotationActionTypes.COLLECT_STATISTICS_FAILED,
                payload: {
                    error,
                },
            });
        }
    };
}

export function showStatistics(visible: boolean): AnyAction {
    return {
        type: AnnotationActionTypes.SWITCH_SHOWING_STATISTICS,
        payload: {
            visible,
        },
    };
}

export function propagateObjectAsync(
    sessionInstance: any,
    objectState: any,
    from: number,
    to: number,
): ThunkAction<Promise<void>, {}, {}, AnyAction> {
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        try {
            const copy = {
                attributes: objectState.attributes,
                points: objectState.points,
                occluded: objectState.occluded,
                objectType: objectState.objectType !== ObjectType.TRACK
                    ? objectState.objectType : ObjectType.SHAPE,
                shapeType: objectState.shapeType,
                label: objectState.label,
                zOrder: objectState.zOrder,
                frame: from,
            };

            await sessionInstance.logger.log(
                LogType.propagateObject, { count: to - from + 1 },
            );
            const states = [];
            for (let frame = from; frame <= to; frame++) {
                copy.frame = frame;
                const newState = new cvat.classes.ObjectState(copy);
                states.push(newState);
            }

            await sessionInstance.annotations.put(states);
            const history = await sessionInstance.actions.get();

            dispatch({
                type: AnnotationActionTypes.PROPAGATE_OBJECT_SUCCESS,
                payload: {
                    objectState,
                    history,
                },
            });
        } catch (error) {
            dispatch({
                type: AnnotationActionTypes.PROPAGATE_OBJECT_FAILED,
                payload: {
                    error,
                },
            });
        }
    };
}

export function propagateObject(objectState: any | null): AnyAction {
    return {
        type: AnnotationActionTypes.PROPAGATE_OBJECT,
        payload: {
            objectState,
        },
    };
}

export function changePropagateFrames(frames: number): AnyAction {
    return {
        type: AnnotationActionTypes.CHANGE_PROPAGATE_FRAMES,
        payload: {
            frames,
        },
    };
}

export function removeObjectAsync(sessionInstance: any, objectState: any, force: boolean):
    ThunkAction<Promise<void>, {}, {}, AnyAction> {
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        try {
            await sessionInstance.logger.log(LogType.deleteObject, { count: 1 });
            const { frame } = receiveAnnotationsParameters();

            const removed = await objectState.delete(frame, force);
            const history = await sessionInstance.actions.get();

            if (removed) {
                dispatch({
                    type: AnnotationActionTypes.REMOVE_OBJECT_SUCCESS,
                    payload: {
                        objectState,
                        history,
                    },
                });
            } else {
                throw new Error('Could not remove the object. Is it locked?');
            }
        } catch (error) {
            dispatch({
                type: AnnotationActionTypes.REMOVE_OBJECT_FAILED,
                payload: {
                    objectState,
                },
            });
        }
    };
}

export function editShape(enabled: boolean): AnyAction {
    return {
        type: AnnotationActionTypes.EDIT_SHAPE,
        payload: {
            enabled,
        },
    };
}

export function copyShape(objectState: any): AnyAction {
    const job = getStore().getState().annotation.job.instance;
    job.logger.log(LogType.copyObject, { count: 1 });

    return {
        type: AnnotationActionTypes.COPY_SHAPE,
        payload: {
            objectState,
        },
    };
}

export function selectObjects(selectedStatesID: number[]): AnyAction {
    return {
        type: AnnotationActionTypes.SELECT_OBJECTS,
        payload: {
            selectedStatesID,
        },
    };
}

export function activateObject(
    activatedStateID: number | null,
    activatedAttributeID: number | null,
): AnyAction {
    return {
        type: AnnotationActionTypes.ACTIVATE_OBJECT,
        payload: {
            activatedStateID,
            activatedAttributeID,
        },
    };
}

export function updateTabContentHeight(tabContentHeight: number): AnyAction {
    return {
        type: AnnotationActionTypes.UPDATE_TAB_CONTENT_HEIGHT,
        payload: {
            tabContentHeight,
        },
    };
}

export function collapseSidebar(): AnyAction {
    return {
        type: AnnotationActionTypes.COLLAPSE_SIDEBAR,
        payload: {},
    };
}

export function collapseAppearance(): AnyAction {
    return {
        type: AnnotationActionTypes.COLLAPSE_APPEARANCE,
        payload: {},
    };
}

export function collapseObjectItems(states: any[], collapsed: boolean): AnyAction {
    return {
        type: AnnotationActionTypes.COLLAPSE_OBJECT_ITEMS,
        payload: {
            states,
            collapsed,
        },
    };
}

export function switchPlay(playing: boolean): AnyAction {
    return {
        type: AnnotationActionTypes.SWITCH_PLAY,
        payload: {
            playing,
        },
    };
}

export function changeFrameAsync(toFrame: number, fillBuffer?: boolean, frameStep?: number):
    ThunkAction<Promise<void>, {}, {}, AnyAction> {
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        const state: CombinedState = getStore().getState();
        const { instance: job } = state.annotation.job;
        const { filters, frame, showAllInterpolationTracks } = receiveAnnotationsParameters();

        try {
            if (toFrame < job.startFrame || toFrame > job.stopFrame) {
                throw Error(`Required frame ${toFrame} is out of the current job`);
            }

            if (toFrame === frame) {
                dispatch({
                    type: AnnotationActionTypes.CHANGE_FRAME_SUCCESS,
                    payload: {
                        number: state.annotation.player.frame.number,
                        data: state.annotation.player.frame.data,
                        filename: state.annotation.player.frame.filename,
                        delay: state.annotation.player.frame.delay,
                        changeTime: state.annotation.player.frame.changeTime,
                        states: state.annotation.annotations.states,
                        minZ: state.annotation.annotations.zLayer.min,
                        maxZ: state.annotation.annotations.zLayer.max,
                        curZ: state.annotation.annotations.zLayer.cur,
                    },
                });

                return;
            }

            // Start async requests
            dispatch({
                type: AnnotationActionTypes.CHANGE_FRAME,
                payload: {},
            });

            await job.logger.log(
                LogType.changeFrame, {
                from: frame,
                to: toFrame,
            },
            );
            const data = await job.frames.get(toFrame, fillBuffer, frameStep);
            const states = await job.annotations.get(toFrame, showAllInterpolationTracks, filters);
            const [minZ, maxZ] = computeZRange(states);
            const currentTime = new Date().getTime();
            let frameSpeed;
            switch (state.settings.player.frameSpeed) {
                case (FrameSpeed.Fast): {
                    frameSpeed = (FrameSpeed.Fast as number) / 2;
                    break;
                }
                case (FrameSpeed.Fastest): {
                    frameSpeed = (FrameSpeed.Fastest as number) / 3;
                    break;
                }
                default: {
                    frameSpeed = state.settings.player.frameSpeed as number;
                }
            }
            const delay = Math.max(0, Math.round(1000 / frameSpeed)
                - currentTime + (state.annotation.player.frame.changeTime as number));

            dispatch({
                type: AnnotationActionTypes.CHANGE_FRAME_SUCCESS,
                payload: {
                    number: toFrame,
                    data,
                    filename: data.filename,
                    states,
                    minZ,
                    maxZ,
                    curZ: maxZ,
                    changeTime: currentTime + delay,
                    delay,
                },
            });
        } catch (error) {
            if (error !== 'not needed') {
                dispatch({
                    type: AnnotationActionTypes.CHANGE_FRAME_FAILED,
                    payload: {
                        number: toFrame,
                        error,
                    },
                });
            }
        }
    };
}

export function undoActionAsync(sessionInstance: any, frame: number):
    ThunkAction<Promise<void>, {}, {}, AnyAction> {
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        try {
            const state = getStore().getState();
            const { filters, showAllInterpolationTracks } = receiveAnnotationsParameters();

            // TODO: use affected IDs as an optimization
            const [undo] = state.annotation.annotations.history.undo.slice(-1);
            const undoLog = await sessionInstance.logger.log(LogType.undoAction, {
                name: undo[0],
                frame: undo[1],
                count: 1,
            }, true);

            dispatch(changeFrameAsync(undo[1]));
            await sessionInstance.actions.undo();
            const history = await sessionInstance.actions.get();
            const states = await sessionInstance.annotations
                .get(frame, showAllInterpolationTracks, filters);
            const [minZ, maxZ] = computeZRange(states);
            await undoLog.close();

            dispatch({
                type: AnnotationActionTypes.UNDO_ACTION_SUCCESS,
                payload: {
                    history,
                    states,
                    minZ,
                    maxZ,
                },
            });
        } catch (error) {
            dispatch({
                type: AnnotationActionTypes.UNDO_ACTION_FAILED,
                payload: {
                    error,
                },
            });
        }
    };
}

export function redoActionAsync(sessionInstance: any, frame: number):
    ThunkAction<Promise<void>, {}, {}, AnyAction> {
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        try {
            const state = getStore().getState();
            const { filters, showAllInterpolationTracks } = receiveAnnotationsParameters();

            // TODO: use affected IDs as an optimization
            const [redo] = state.annotation.annotations.history.redo.slice(-1);
            const redoLog = await sessionInstance.logger.log(LogType.redoAction, {
                name: redo[0],
                frame: redo[1],
                count: 1,
            }, true);
            dispatch(changeFrameAsync(redo[1]));
            await sessionInstance.actions.redo();
            const history = await sessionInstance.actions.get();
            const states = await sessionInstance.annotations
                .get(frame, showAllInterpolationTracks, filters);
            const [minZ, maxZ] = computeZRange(states);
            await redoLog.close();

            dispatch({
                type: AnnotationActionTypes.REDO_ACTION_SUCCESS,
                payload: {
                    history,
                    states,
                    minZ,
                    maxZ,
                },
            });
        } catch (error) {
            dispatch({
                type: AnnotationActionTypes.REDO_ACTION_FAILED,
                payload: {
                    error,
                },
            });
        }
    };
}

export function rotateCurrentFrame(rotation: Rotation): AnyAction {
    const state: CombinedState = getStore().getState();
    const {
        annotation: {
            player: {
                frame: {
                    number: frameNumber,
                },
                frameAngles,
            },
            job: {
                instance: job,
                instance: {
                    startFrame,
                },
            },
        },
        settings: {
            player: {
                rotateAll,
            },
        },
    } = state;

    const frameAngle = (frameAngles[frameNumber - startFrame]
        + (rotation === Rotation.CLOCKWISE90 ? 90 : 270)) % 360;

    job.logger.log(LogType.rotateImage, { angle: frameAngle });

    return {
        type: AnnotationActionTypes.ROTATE_FRAME,
        payload: {
            offset: frameNumber - state.annotation.job.instance.startFrame,
            angle: frameAngle,
            rotateAll,
        },
    };
}

export function dragCanvas(enabled: boolean): AnyAction {

    return {
        type: AnnotationActionTypes.DRAG_CANVAS,
        payload: {
            enabled,
        },
    };

}

export function zoomCanvas(enabled: boolean): AnyAction {
    const { jobInstance } = receiveAnnotationsParameters();
    console.log('6', jobInstance);
    return {
        type: AnnotationActionTypes.ZOOM_CANVAS,
        payload: {
            enabled,
        },
    };
}

export function resetCanvas(): AnyAction {
    return {
        type: AnnotationActionTypes.RESET_CANVAS,
        payload: {},
    };
}

export function confirmCanvasReady(): AnyAction {
    return {
        type: AnnotationActionTypes.CONFIRM_CANVAS_READY,
        payload: {},
    };
}

export function closeJob(): ThunkAction<Promise<void>, {}, {}, AnyAction> {
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        const { jobInstance } = receiveAnnotationsParameters();
        if (jobInstance) {
            await jobInstance.task.close();
        }

        dispatch({
            type: AnnotationActionTypes.CLOSE_JOB,
        });
    };
}

export function getJobAsync(
    tid: number,
    jid: number,
    initialFrame: number,
    initialFilters: string[],
): ThunkAction<Promise<void>, {}, {}, AnyAction> {
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        try {
            const state: CombinedState = getStore().getState();
            const filters = initialFilters;
            const { showAllInterpolationTracks } = state.settings.workspace;

            dispatch({
                type: AnnotationActionTypes.GET_JOB,
                payload: {
                    requestedId: jid,
                },
            });

            const loadJobEvent = await logger.log(
                LogType.loadJob, {
                task_id: tid,
                job_id: jid,
            }, true,
            );

            // Check state if the task is already there
            let task = state.tasks.current
                .filter((_task: Task) => _task.instance.id === tid)
                .map((_task: Task) => _task.instance)[0];

            // If there aren't the task, get it from the server
            if (!task) {
                [task] = await cvat.tasks.get({ id: tid });
            }

            // Finally get the job from the task
            const job = task.jobs
                .filter((_job: any) => _job.id === jid)[0];
            if (!job) {
                throw new Error(`Task ${tid} doesn't contain the job ${jid}`);
            }

            const frameNumber = Math.max(Math.min(job.stopFrame, initialFrame), job.startFrame);
            const frameData = await job.frames.get(frameNumber);
            // call first getting of frame data before rendering interface
            // to load and decode first chunk
            await frameData.data();
            const states = await job.annotations
                .get(frameNumber, showAllInterpolationTracks, filters);
            const [minZ, maxZ] = computeZRange(states);
            const colors = [...cvat.enums.colors];

            loadJobEvent.close(await jobInfoGenerator(job));

            dispatch({
                type: AnnotationActionTypes.GET_JOB_SUCCESS,
                payload: {
                    job,
                    states,
                    frameNumber,
                    frameFilename: frameData.filename,
                    frameData,
                    colors,
                    filters,
                    minZ,
                    maxZ,
                },
            });
            dispatch(changeFrameAsync(frameNumber, false));
        } catch (error) {
            dispatch({
                type: AnnotationActionTypes.GET_JOB_FAILED,
                payload: {
                    error,
                },
            });
        }
    };
}

export function saveAnnotationsAsync(sessionInstance: any):
    ThunkAction<Promise<void>, {}, {}, AnyAction> {
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        const { filters, frame, showAllInterpolationTracks } = receiveAnnotationsParameters();

        dispatch({
            type: AnnotationActionTypes.SAVE_ANNOTATIONS,
            payload: {},
        });

        try {
            const saveJobEvent = await sessionInstance.logger.log(
                LogType.saveJob, {}, true,
            );

            await sessionInstance.annotations.save((status: string) => {
                dispatch({
                    type: AnnotationActionTypes.SAVE_UPDATE_ANNOTATIONS_STATUS,
                    payload: {
                        status,
                    },
                });
            });

            const states = await sessionInstance
                .annotations.get(frame, showAllInterpolationTracks, filters);
            await saveJobEvent.close();
            await sessionInstance.logger.log(
                LogType.sendTaskInfo,
                await jobInfoGenerator(sessionInstance),
            );
            dispatch(saveLogsAsync());

            dispatch({
                type: AnnotationActionTypes.SAVE_ANNOTATIONS_SUCCESS,
                payload: {
                    states,
                },
            });
        } catch (error) {
            dispatch({
                type: AnnotationActionTypes.SAVE_ANNOTATIONS_FAILED,
                payload: {
                    error,
                },
            });
        }
    };
}

// used to reproduce the latest drawing (in case of tags just creating) by using N
export function rememberObject(
    objectType: ObjectType,
    labelID: number,
    shapeType?: ShapeType,
    points?: number,
    rectDrawingMethod?: RectDrawingMethod,
): AnyAction {
    let activeControl = ActiveControl.CURSOR;
    if (shapeType === ShapeType.RECTANGLE) {
        activeControl = ActiveControl.DRAW_RECTANGLE;
    } else if (shapeType === ShapeType.POLYGON) {
        activeControl = ActiveControl.DRAW_POLYGON;
    } else if (shapeType === ShapeType.POLYLINE) {
        activeControl = ActiveControl.DRAW_POLYLINE;
    } else if (shapeType === ShapeType.POINTS) {
        activeControl = ActiveControl.DRAW_POINTS;
    } else if (shapeType === ShapeType.CUBOID) {
        activeControl = ActiveControl.DRAW_CUBOID;
    }

    return {
        type: AnnotationActionTypes.REMEMBER_CREATED_OBJECT,
        payload: {
            shapeType,
            labelID,
            objectType,
            points,
            activeControl,
            rectDrawingMethod,
        },
    };
}

export function shapeDrawn(): AnyAction {
    return {
        type: AnnotationActionTypes.SHAPE_DRAWN,
        payload: {},
    };
}

export function mergeObjects(enabled: boolean): AnyAction {
    return {
        type: AnnotationActionTypes.MERGE_OBJECTS,
        payload: {
            enabled,
        },
    };
}

export function groupObjects(enabled: boolean): AnyAction {
    return {
        type: AnnotationActionTypes.GROUP_OBJECTS,
        payload: {
            enabled,
        },
    };
}

export function splitTrack(enabled: boolean): AnyAction {
    return {
        type: AnnotationActionTypes.SPLIT_TRACK,
        payload: {
            enabled,
        },
    };
}

export function updateAnnotationsAsync(statesToUpdate: any[]):
    ThunkAction<Promise<void>, {}, {}, AnyAction> {
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        const {
            jobInstance,
            filters,
            frame,
            showAllInterpolationTracks,
        } = receiveAnnotationsParameters();

        try {
            if (statesToUpdate.some((state: any): boolean => state.updateFlags.zOrder)) {
                // deactivate object to visualize changes immediately (UX)
                dispatch(activateObject(null, null));
            }

            const promises = statesToUpdate
                .map((objectState: any): Promise<any> => objectState.save());
            const states = await Promise.all(promises);
            const history = await jobInstance.actions.get();
            const [minZ, maxZ] = computeZRange(states);

            dispatch({
                type: AnnotationActionTypes.UPDATE_ANNOTATIONS_SUCCESS,
                payload: {
                    states,
                    history,
                    minZ,
                    maxZ,
                },
            });
        } catch (error) {
            const states = await jobInstance.annotations
                .get(frame, showAllInterpolationTracks, filters);
            dispatch({
                type: AnnotationActionTypes.UPDATE_ANNOTATIONS_FAILED,
                payload: {
                    error,
                    states,
                },
            });
        }
    };
}

export function createAnnotationsAsync(sessionInstance: any, frame: number, statesToCreate: any[]):
    ThunkAction<Promise<void>, {}, {}, AnyAction> {
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        try {
            const { filters, showAllInterpolationTracks } = receiveAnnotationsParameters();
            await sessionInstance.annotations.put(statesToCreate);
            const states = await sessionInstance.annotations
                .get(frame, showAllInterpolationTracks, filters);
            const history = await sessionInstance.actions.get();

            dispatch({
                type: AnnotationActionTypes.CREATE_ANNOTATIONS_SUCCESS,
                payload: {
                    states,
                    history,
                },
            });
        } catch (error) {
            dispatch({
                type: AnnotationActionTypes.CREATE_ANNOTATIONS_FAILED,
                payload: {
                    error,
                },
            });
        }
    };
}

export function mergeAnnotationsAsync(sessionInstance: any, frame: number, statesToMerge: any[]):
    ThunkAction<Promise<void>, {}, {}, AnyAction> {
        console.log('MARKER mergeAnnotationsAsync',statesToMerge);
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        try {
            const { filters, showAllInterpolationTracks } = receiveAnnotationsParameters();
            await sessionInstance.annotations.merge(statesToMerge);
            const states = await sessionInstance.annotations
                .get(frame, showAllInterpolationTracks, filters);
            const history = await sessionInstance.actions.get();

            dispatch({
                type: AnnotationActionTypes.MERGE_ANNOTATIONS_SUCCESS,
                payload: {
                    states,
                    history,
                },
            });
        } catch (error) {
            dispatch({
                type: AnnotationActionTypes.MERGE_ANNOTATIONS_FAILED,
                payload: {
                    error,
                },
            });
        }
    };
}

export function resetAnnotationsGroup(): AnyAction {
    return {
        type: AnnotationActionTypes.RESET_ANNOTATIONS_GROUP,
        payload: {},
    };
}

export function groupAnnotationsAsync(
    sessionInstance: any,
    frame: number,
    statesToGroup: any[],
): ThunkAction<Promise<void>, {}, {}, AnyAction> {
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        try {
            const { filters, showAllInterpolationTracks } = receiveAnnotationsParameters();
            const reset = getStore().getState().annotation.annotations.resetGroupFlag;

            // The action below set resetFlag to false
            dispatch({
                type: AnnotationActionTypes.GROUP_ANNOTATIONS,
                payload: {},
            });

            await sessionInstance.annotations.group(statesToGroup, reset);
            const states = await sessionInstance.annotations
                .get(frame, showAllInterpolationTracks, filters);
            const history = await sessionInstance.actions.get();

            dispatch({
                type: AnnotationActionTypes.GROUP_ANNOTATIONS_SUCCESS,
                payload: {
                    states,
                    history,
                },
            });
        } catch (error) {
            dispatch({
                type: AnnotationActionTypes.GROUP_ANNOTATIONS_FAILED,
                payload: {
                    error,
                },
            });
        }
    };
}

export function splitAnnotationsAsync(sessionInstance: any, frame: number, stateToSplit: any):
    ThunkAction<Promise<void>, {}, {}, AnyAction> {
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        const { filters, showAllInterpolationTracks } = receiveAnnotationsParameters();
        try {
            await sessionInstance.annotations.split(stateToSplit, frame);
            const states = await sessionInstance.annotations
                .get(frame, showAllInterpolationTracks, filters);
            const history = await sessionInstance.actions.get();

            dispatch({
                type: AnnotationActionTypes.SPLIT_ANNOTATIONS_SUCCESS,
                payload: {
                    states,
                    history,
                },
            });
        } catch (error) {
            dispatch({
                type: AnnotationActionTypes.SPLIT_ANNOTATIONS_FAILED,
                payload: {
                    error,
                },
            });
        }
    };
}

export function changeLabelColorAsync(
    label: any,
    color: string,
): ThunkAction<Promise<void>, {}, {}, AnyAction> {
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        try {
            const {
                filters,
                showAllInterpolationTracks,
                jobInstance,
                frame,
            } = receiveAnnotationsParameters();

            const updatedLabel = label;
            updatedLabel.color = color;
            const states = await jobInstance.annotations
                .get(frame, showAllInterpolationTracks, filters);
            const history = await jobInstance.actions.get();

            dispatch({
                type: AnnotationActionTypes.CHANGE_LABEL_COLOR_SUCCESS,
                payload: {
                    label: updatedLabel,
                    history,
                    states,
                },
            });
        } catch (error) {
            dispatch({
                type: AnnotationActionTypes.CHANGE_LABEL_COLOR_FAILED,
                payload: {
                    error,
                },
            });
        }
    };
}

export function changeGroupColorAsync(
    group: number,
    color: string,
): ThunkAction<Promise<void>, {}, {}, AnyAction> {
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        const state: CombinedState = getStore().getState();
        const groupStates = state.annotation.annotations.states
            .filter((_state: any): boolean => _state.group.id === group);
        if (groupStates.length) {
            groupStates[0].group.color = color;
            dispatch(updateAnnotationsAsync(groupStates));
        } else {
            dispatch(updateAnnotationsAsync([]));
        }
    };
}

export function searchAnnotationsAsync(
    sessionInstance: any,
    frameFrom: number,
    frameTo: number,
): ThunkAction<Promise<void>, {}, {}, AnyAction> {
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        try {
            const { filters } = receiveAnnotationsParameters();
            const frame = await sessionInstance.annotations.search(filters, frameFrom, frameTo);
            if (frame !== null) {
                dispatch(changeFrameAsync(frame));
            }
        } catch (error) {
            dispatch({
                type: AnnotationActionTypes.SEARCH_ANNOTATIONS_FAILED,
                payload: {
                    error,
                },
            });
        }
    };
}

export function pasteShapeAsync(): ThunkAction<Promise<void>, {}, {}, AnyAction> {
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        const {
            canvas: {
                instance: canvasInstance,
            },
            job: {
                instance: jobInstance,
            },
            player: {
                frame: {
                    number: frameNumber,
                },
            },
            drawing: {
                activeInitialState: initialState,
            },
        } = getStore().getState().annotation;

        if (initialState) {
            let activeControl = ActiveControl.CURSOR;
            if (initialState.shapeType === ShapeType.RECTANGLE) {
                activeControl = ActiveControl.DRAW_RECTANGLE;
            } else if (initialState.shapeType === ShapeType.POINTS) {
                activeControl = ActiveControl.DRAW_POINTS;
            } else if (initialState.shapeType === ShapeType.POLYGON) {
                activeControl = ActiveControl.DRAW_POLYGON;
            } else if (initialState.shapeType === ShapeType.POLYLINE) {
                activeControl = ActiveControl.DRAW_POLYLINE;
            } else if (initialState.shapeType === ShapeType.CUBOID) {
                activeControl = ActiveControl.DRAW_CUBOID;
            }

            dispatch({
                type: AnnotationActionTypes.PASTE_SHAPE,
                payload: {
                    activeControl,
                },
            });

            canvasInstance.cancel();
            if (initialState.objectType === ObjectType.TAG) {
                const objectState = new cvat.classes.ObjectState({
                    objectType: ObjectType.TAG,
                    label: initialState.label,
                    attributes: initialState.attributes,
                    frame: frameNumber,
                });
                dispatch(createAnnotationsAsync(jobInstance, frameNumber, [objectState]));
            } else {
                canvasInstance.draw({
                    enabled: true,
                    initialState,
                });
            }
        }
    };
}

export function repeatDrawShapeAsync(): ThunkAction<Promise<void>, {}, {}, AnyAction> {
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        const {
            canvas: {
                instance: canvasInstance,
            },
            job: {
                labels,
                instance: jobInstance,
            },
            player: {
                frame: {
                    number: frameNumber,
                },
            },
            drawing: {
                activeObjectType,
                activeLabelID,
                activeShapeType,
                activeNumOfPoints,
                activeRectDrawingMethod,
            },
        } = getStore().getState().annotation;

        let activeControl = ActiveControl.CURSOR;
        if (activeShapeType === ShapeType.RECTANGLE) {
            activeControl = ActiveControl.DRAW_RECTANGLE;
        } else if (activeShapeType === ShapeType.POINTS) {
            activeControl = ActiveControl.DRAW_POINTS;
        } else if (activeShapeType === ShapeType.POLYGON) {
            activeControl = ActiveControl.DRAW_POLYGON;
        } else if (activeShapeType === ShapeType.POLYLINE) {
            activeControl = ActiveControl.DRAW_POLYLINE;
        } else if (activeShapeType === ShapeType.CUBOID) {
            activeControl = ActiveControl.DRAW_CUBOID;
        }

        dispatch({
            type: AnnotationActionTypes.REPEAT_DRAW_SHAPE,
            payload: {
                activeControl,
            },
        });

        canvasInstance.cancel();
        if (activeObjectType === ObjectType.TAG) {
            const objectState = new cvat.classes.ObjectState({
                objectType: ObjectType.TAG,
                label: labels.filter((label: any) => label.id === activeLabelID)[0],
                frame: frameNumber,
            });
            dispatch(createAnnotationsAsync(jobInstance, frameNumber, [objectState]));
        } else {
            canvasInstance.draw({
                enabled: true,
                rectDrawingMethod: activeRectDrawingMethod,
                numberOfPoints: activeNumOfPoints,
                shapeType: activeShapeType,
                crosshair: activeShapeType === ShapeType.RECTANGLE,
            });
        }
    };
}

export function redrawShapeAsync(): ThunkAction<Promise<void>, {}, {}, AnyAction> {
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        const {
            annotations: {
                activatedStateID,
                states,
            },
            canvas: {
                instance: canvasInstance,
            },
        } = getStore().getState().annotation;

        if (activatedStateID !== null) {
            const [state] = states
                .filter((_state: any): boolean => _state.clientID === activatedStateID);
            if (state && state.objectType !== ObjectType.TAG) {
                let activeControl = ActiveControl.CURSOR;
                if (state.shapeType === ShapeType.RECTANGLE) {
                    activeControl = ActiveControl.DRAW_RECTANGLE;
                } else if (state.shapeType === ShapeType.POINTS) {
                    activeControl = ActiveControl.DRAW_POINTS;
                } else if (state.shapeType === ShapeType.POLYGON) {
                    activeControl = ActiveControl.DRAW_POLYGON;
                } else if (state.shapeType === ShapeType.POLYLINE) {
                    activeControl = ActiveControl.DRAW_POLYLINE;
                } else if (state.shapeType === ShapeType.CUBOID) {
                    activeControl = ActiveControl.DRAW_CUBOID;
                }

                dispatch({
                    type: AnnotationActionTypes.REPEAT_DRAW_SHAPE,
                    payload: {
                        activeControl,
                    },
                });

                canvasInstance.cancel();
                canvasInstance.draw({
                    enabled: true,
                    redraw: activatedStateID,
                    shapeType: state.shapeType,
                    crosshair: state.shapeType === ShapeType.RECTANGLE,
                });
            }
        }
    };
}

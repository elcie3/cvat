// Copyright (C) 2020 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { ExtendedKeyMapOptions } from 'react-hotkeys';
import { connect } from 'react-redux';

import CanvasWrapperComponent from 'components/annotation-page/standard-workspace/canvas-wrapper';
import {
    confirmCanvasReady,
    dragCanvas,
    zoomCanvas,
    resetCanvas,
    shapeDrawn,
    mergeObjects,
    groupObjects,
    splitTrack,
    editShape,
    updateAnnotationsAsync,
    createAnnotationsAsync,
    mergeAnnotationsAsync,
    groupAnnotationsAsync,
    splitAnnotationsAsync,
    activateObject,
    selectObjects,
    updateCanvasContextMenu,
    addZLayer,
    switchZLayer,
    fetchAnnotationsAsync,
    switchTracking, // ISL MANUAL TRACKING
    autoFit, // ISL AUTOFIT
    asLastKeyframe,
    setGlobalAttributesVisibility,
    track,
    changeFrameAsync,
    switchAutoTrack,
    switchTrackModalVisibility,
    fetch
} from 'actions/annotation-actions';
import {
    switchGrid,
    changeGridColor,
    changeGridOpacity,
    changeBrightnessLevel,
    changeContrastLevel,
    changeSaturationLevel,
    switchAutomaticBordering,
} from 'actions/settings-actions';
import {
    ColorBy,
    GridColor,
    ObjectType,
    CombinedState,
    ContextMenuType,
    Workspace,
    ActiveControl,
} from 'reducers/interfaces';

import { Canvas } from 'cvat-canvas-wrapper';

interface StateToProps {
    sidebarCollapsed: boolean;
    canvasInstance: Canvas;
    jobInstance: any;
    activatedStateID: number | null;
    activatedAttributeID: number | null;
    selectedStatesID: number[];
    annotations: any[];
    frameData: any;
    frameAngle: number;
    frameFetching: boolean;
    frame: number;
    opacity: number;
    colorBy: ColorBy;
    selectedOpacity: number;
    blackBorders: boolean;
    showBitmap: boolean;
    showProjections: boolean;
    grid: boolean;
    gridSize: number;
    gridColor: GridColor;
    gridOpacity: number;
    activeLabelID: number;
    activeObjectType: ObjectType;
    brightnessLevel: number;
    contrastLevel: number;
    saturationLevel: number;
    resetZoom: boolean;
    aamZoomMargin: number;
    showObjectsTextAlways: boolean;
    showAllInterpolationTracks: boolean;
    workspace: Workspace;
    minZLayer: number;
    maxZLayer: number;
    curZLayer: number;
    automaticBordering: boolean;
    switchableAutomaticBordering: boolean;
    keyMap: Record<string, ExtendedKeyMapOptions>;
    // ISL MANUAL TRACKING
    tracking: boolean;
    trackedStateID: number | null;
    // ISL END
    canvasBackgroundColor: string;
    // ISL AUTOFIT
    autoFitObjects: any[];
    // ISL END
    // ISL GLOBAL ATTRIBUTES
    globalAttributes: any;
    globalAttributesVisibility: boolean;
    // ISL END
    contextMenuVisibility: boolean; // ISL FIX CONTEXT MENU
    automaticTracking:any;
}

interface DispatchToProps {
    onSetupCanvas(): void;
    onDragCanvas: (enabled: boolean) => void;
    onZoomCanvas: (enabled: boolean) => void;
    onResetCanvas: () => void;
    onShapeDrawn: () => void;
    onMergeObjects: (enabled: boolean) => void;
    onGroupObjects: (enabled: boolean) => void;
    onSplitTrack: (enabled: boolean) => void;
    onEditShape: (enabled: boolean) => void;
    onUpdateAnnotations(states: any[]): void;
    onCreateAnnotations(sessionInstance: any, frame: number, states: any[]): void;
    onMergeAnnotations(sessionInstance: any, frame: number, states: any[]): void;
    onGroupAnnotations(sessionInstance: any, frame: number, states: any[]): void;
    onSplitAnnotations(sessionInstance: any, frame: number, state: any): void;
    onActivateObject: (activatedStateID: number | null) => void;
    onSelectObjects: (selectedStatesID: number[]) => void;
    onUpdateContextMenu(visible: boolean, left: number, top: number, type: ContextMenuType,
        pointID?: number): void;
    onAddZLayer(): void;
    onSwitchZLayer(cur: number): void;
    onChangeBrightnessLevel(level: number): void;
    onChangeContrastLevel(level: number): void;
    onChangeSaturationLevel(level: number): void;
    onChangeGridOpacity(opacity: number): void;
    onChangeGridColor(color: GridColor): void;
    onSwitchGrid(enabled: boolean): void;
    onSwitchTracking(tracking: boolean, trackedStateID: number | null): void; // ISL MANUAL TRACKING
    onSwitchAutomaticBordering(enabled: boolean): void;
    onFetchAnnotation(): void;
    onAutoFit(jobInstance: any, stateToFit: any, frame: number): void; // ISL AUTOFIT
    onSetLastKeyframe(jobInstance: any, stateToFit: any, frame: number): void;
    onSetGlobalAttributesVisibility(visibility:boolean):void; // ISL GLOBAL ATTRIBUTES
    // ISL TRACKING
    onTrack(jobInstance:any,clientID:number,frameStart:number,frameEnd:number,points:number[]):void;
    onChangeFrame(frame: number, fillBuffer?: boolean, frameStep?: number): void;
    onSwitchAutoTrack(status:boolean):void;
    onSwitchTrackModalVisibility(visibility:boolean,jobInstance:any, frame_num:number,sourceState:any):void;
    onFetch(jobInstance:any,url:string,params:any):void;
    // ISL END
}

function mapStateToProps(state: CombinedState): StateToProps {
    const {
        annotation: {
            canvas: {
                activeControl,
                instance: canvasInstance,
                // ISL FIX CONTEXT MENU
                contextMenu:{
                    visible: contextMenuVisibility,
                }
                // ISL END
            },
            drawing: {
                activeLabelID,
                activeObjectType,
            },
            job: {
                instance: jobInstance,
            },
            player: {
                frame: {
                    data: frameData,
                    number: frame,
                    fetching: frameFetching,
                },
                frameAngles,
            },
            annotations: {
                states: annotations,
                activatedStateID,
                activatedAttributeID,
                selectedStatesID,
                zLayer: {
                    cur: curZLayer,
                    min: minZLayer,
                    max: maxZLayer,
                },
            },
            // ISL MANUAL TRACKING
            trackobject: {
                tracking,
                trackedStateID,
            },
            // ISL END
            // ISL AUTOFIT
            autoFitObjects,
            // ISL END
            sidebarCollapsed,
            workspace,
            // ISL GLOBAL ATTRIBUTES
            globalAttributes,
            globalAttributesVisibility,
            // ISL END
            automaticTracking:automaticTracking,
        },
        settings: {
            player: {
                canvasBackgroundColor,
                grid,
                gridSize,
                gridColor,
                gridOpacity,
                brightnessLevel,
                contrastLevel,
                saturationLevel,
                resetZoom,
            },
            workspace: {
                aamZoomMargin,
                showObjectsTextAlways,
                showAllInterpolationTracks,
                automaticBordering,
            },
            shapes: {
                opacity,
                colorBy,
                selectedOpacity,
                blackBorders,
                showBitmap,
                showProjections,
            },
        },
        shortcuts: {
            keyMap,
        },
    } = state;

    return {
        sidebarCollapsed,
        canvasInstance,
        jobInstance,
        frameData,
        frameAngle: frameAngles[frame - jobInstance.startFrame],
        frameFetching,
        frame,
        activatedStateID,
        activatedAttributeID,
        selectedStatesID,
        annotations,
        opacity,
        colorBy,
        selectedOpacity,
        blackBorders,
        showBitmap,
        showProjections,
        grid,
        gridSize,
        gridColor,
        gridOpacity,
        activeLabelID,
        activeObjectType,
        brightnessLevel,
        contrastLevel,
        saturationLevel,
        resetZoom,
        aamZoomMargin,
        showObjectsTextAlways,
        showAllInterpolationTracks,
        curZLayer,
        minZLayer,
        maxZLayer,
        automaticBordering,
        workspace,
        keyMap,
        // ISL MANUAL TRACKING
        tracking,
        trackedStateID,
        // ISL END
        canvasBackgroundColor,
        // ISL AUTOFIT
        autoFitObjects,
        // ISL END
        switchableAutomaticBordering: activeControl === ActiveControl.DRAW_POLYGON
            || activeControl === ActiveControl.DRAW_POLYLINE
            || activeControl === ActiveControl.EDIT,
        // ISL GLOBAL ATTRIBUTES
        globalAttributes,
        globalAttributesVisibility,
        // ISL END
        contextMenuVisibility, // ISL CONTEXT MENU
        automaticTracking,
    };
}

function mapDispatchToProps(dispatch: any): DispatchToProps {
    return {
        onSetupCanvas(): void {
            dispatch(confirmCanvasReady());
        },
        onDragCanvas(enabled: boolean): void {
            dispatch(dragCanvas(enabled));
        },
        onZoomCanvas(enabled: boolean): void {
            dispatch(zoomCanvas(enabled));
        },
        onResetCanvas(): void {
            dispatch(resetCanvas());
        },
        onShapeDrawn(): void {
            dispatch(shapeDrawn());
        },
        onMergeObjects(enabled: boolean): void {
            dispatch(mergeObjects(enabled));
        },
        onGroupObjects(enabled: boolean): void {
            dispatch(groupObjects(enabled));
        },
        onSplitTrack(enabled: boolean): void {
            dispatch(splitTrack(enabled));
        },
        onEditShape(enabled: boolean): void {
            dispatch(editShape(enabled));
        },
        onUpdateAnnotations(states: any[]): void {
            dispatch(updateAnnotationsAsync(states));
        },
        onCreateAnnotations(sessionInstance: any, frame: number, states: any[]): void {
            dispatch(createAnnotationsAsync(sessionInstance, frame, states));
        },
        onMergeAnnotations(sessionInstance: any, frame: number, states: any[]): void {
            dispatch(mergeAnnotationsAsync(sessionInstance, frame, states));
        },
        onGroupAnnotations(sessionInstance: any, frame: number, states: any[]): void {
            dispatch(groupAnnotationsAsync(sessionInstance, frame, states));
        },
        onSplitAnnotations(sessionInstance: any, frame: number, state: any): void {
            dispatch(splitAnnotationsAsync(sessionInstance, frame, state));
        },
        onActivateObject(activatedStateID: number | null): void {
            if (activatedStateID === null) {
                dispatch(updateCanvasContextMenu(false, 0, 0));
            }

            dispatch(activateObject(activatedStateID, null));
        },
        onSelectObjects(selectedStatesID: number[]): void {
            dispatch(selectObjects(selectedStatesID));
        },
        onUpdateContextMenu(visible: boolean, left: number, top: number,
            type: ContextMenuType, pointID?: number): void {
            dispatch(updateCanvasContextMenu(visible, left, top, pointID, type));
        },
        onAddZLayer(): void {
            dispatch(addZLayer());
        },
        onSwitchZLayer(cur: number): void {
            dispatch(switchZLayer(cur));
        },
        onChangeBrightnessLevel(level: number): void {
            dispatch(changeBrightnessLevel(level));
        },
        onChangeContrastLevel(level: number): void {
            dispatch(changeContrastLevel(level));
        },
        onChangeSaturationLevel(level: number): void {
            dispatch(changeSaturationLevel(level));
        },
        onChangeGridOpacity(opacity: number): void {
            dispatch(changeGridOpacity(opacity));
        },
        onChangeGridColor(color: GridColor): void {
            dispatch(changeGridColor(color));
        },
        onSwitchGrid(enabled: boolean): void {
            dispatch(switchGrid(enabled));
        },
        // ISL MANUAL TRACKING
        onSwitchTracking(tracking: boolean, trackedStateID: number | null): void {
            dispatch(switchTracking(tracking, trackedStateID));
        },
        // ISL END
        onSwitchAutomaticBordering(enabled: boolean): void {
            dispatch(switchAutomaticBordering(enabled));
        },
        onFetchAnnotation(): void {
            dispatch(fetchAnnotationsAsync());
        },
        // ISL AUTOFIT
        onAutoFit(jobInstance: any, stateToFit: any, frame: number): void {
            dispatch(autoFit(jobInstance, stateToFit, frame));
        },
        // ISL END
                // ISL INTERPOLATION
                onSetLastKeyframe(jobInstance: any, stateToFit: any, frame: number): void {
                    dispatch(asLastKeyframe(jobInstance, stateToFit, frame));
                },
                // ISL END
        // ISL GLOBAL ATTRIBUTES
        onSetGlobalAttributesVisibility(visibility:boolean): void {
            dispatch(setGlobalAttributesVisibility(visibility));
        },
        // ISL END
        // ISL TRACK
        onTrack(jobInstance:any,objectState:any,frameStart:number,frameEnd:number):void {
            dispatch(track(jobInstance,objectState,frameStart,frameEnd));
        },
        onChangeFrame(frame: number, fillBuffer?: boolean, frameStep?: number): void {
            dispatch(changeFrameAsync(frame, fillBuffer, frameStep));
        },
        onFetch(jobInstance:any,url:string,params:any):void{
            dispatch(fetch(jobInstance,url,params));
        },
        // ISL END
        onSwitchAutoTrack(status:boolean):void{
            dispatch(switchAutoTrack(status));
        },
        onSwitchTrackModalVisibility(visibility:boolean,jobInstance:any, frame_num:number,sourceState:any):void{
            dispatch(switchTrackModalVisibility(visibility,jobInstance,frame_num,sourceState));
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CanvasWrapperComponent);

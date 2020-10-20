// Copyright (C) 2020 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';

import ObjectButtonsContainer from 'containers/annotation-page/standard-workspace/objects-side-bar/object-buttons';
import {
    ObjectType,
    ShapeType,
    ColorBy,
} from 'reducers/interfaces';
import ItemDetails, { attrValuesAreEqual } from './object-item-details';
import ItemBasics from './object-item-basics';


// function ItemMenu(
//     serverID: number | undefined,
//     locked: boolean,
//     shapeType: ShapeType,
//     objectType: ObjectType,
//     copyShortcut: string,
//     pasteShortcut: string,
//     propagateShortcut: string,
//     toBackgroundShortcut: string,
//     toForegroundShortcut: string,
//     removeShortcut: string,
//     copy: (() => void),
//     remove: (() => void),
//     propagate: (() => void),
//     createURL: (() => void),
//     switchOrientation: (() => void),
//     toBackground: (() => void),
//     toForeground: (() => void),
//     resetCuboidPerspective: (() => void),
//     // ISL AUTOFIT
//     autoFit: (() => void),
//     // ISL
//     // ISL INTERPOLATION
//     asLastKeyframe: (() => void),
//     // ISL END
//     // ISL TRACKING
//     track: (() => void),
//     // ISL END
// ): JSX.Element {
//     return (
//         <Menu className='cvat-object-item-menu'>
//             <Menu.Item>
//                 <Button disabled={serverID === undefined} type='link' icon='link' onClick={createURL}>
//                     Create object URL
//                 </Button>
//             </Menu.Item>
//             <Menu.Item>
//                 <Tooltip title={`${copyShortcut} and ${pasteShortcut}`}>
//                     <Button type='link' icon='copy' onClick={copy}>
//                         Make a copy
//                     </Button>
//                 </Tooltip>
//             </Menu.Item>
//             <Menu.Item>
//                 <Tooltip title={`${propagateShortcut}`}>
//                     <Button type='link' icon='block' onClick={propagate}>
//                         Propagate
//                     </Button>
//                 </Tooltip>
//             </Menu.Item>
//             { [ShapeType.POLYGON, ShapeType.POLYLINE, ShapeType.CUBOID].includes(shapeType) && (
//                 <Menu.Item>
//                     <Button type='link' icon='retweet' onClick={switchOrientation}>
//                         Switch orientation
//                     </Button>
//                 </Menu.Item>
//             )}
//             {shapeType === ShapeType.CUBOID && (
//                 <Menu.Item>
//                     <Button type='link' onClick={resetCuboidPerspective}>
//                         <Icon component={ResetPerspectiveIcon} />
//                         Reset perspective
//                     </Button>
//                 </Menu.Item>
//             )}
//             {objectType !== ObjectType.TAG && (
//                 <Menu.Item>
//                     <Tooltip title={`${toBackgroundShortcut}`}>
//                         <Button type='link' onClick={toBackground}>
//                             <Icon component={BackgroundIcon} />
//                             To background
//                         </Button>
//                     </Tooltip>
//                 </Menu.Item>
//             )}
//             {objectType !== ObjectType.TAG && (
//                 <Menu.Item>
//                     <Tooltip title={`${toForegroundShortcut}`}>
//                         <Button type='link' onClick={toForeground}>
//                             <Icon component={ForegroundIcon} />
//                             To foreground
//                         </Button>
//                     </Tooltip>
//                 </Menu.Item>
//             )}
//             <Menu.Item>
//                 <Tooltip title={`${removeShortcut}`}>
//                     <Button
//                         type='link'
//                         icon='delete'
//                         onClick={(): void => {
//                             if (locked) {
//                                 Modal.confirm({
//                                     title: 'Object is locked',
//                                     content: 'Are you sure you want to remove it?',
//                                     onOk() {
//                                         remove();
//                                     },
//                                 });
//                             } else {
//                                 remove();
//                             }
//                         }}
//                     >
//                         Remove
//                     </Button>
//                 </Tooltip>
//             </Menu.Item>
//             {/* ISL AUTOFIT */}
//             <Menu.Item>
//                 <Tooltip title={`Detects the object and fits the box around its edges.`}>
//                     <Button
//                         type='link'
//                         icon='import'
//                         onClick={autoFit}
//                     >
//                         AutoFit
//                     </Button>
//                 </Tooltip>
//             </Menu.Item>
//             {/* ISL END */}
//             {/* ISL INTERPOLATION */}
//             {/* <Menu.Item>
//                 <Tooltip title={`Copies the dimensions of the box of the last keyframe.`}>
//                     <Button
//                         type='link'
//                         icon='import'
//                         onClick={asLastKeyframe}
//                     >
//                         Copy last keyframe
//                     </Button>
//                 </Tooltip>
//             </Menu.Item>
//             {/* ISL END */}
//             {/* ISL TRACKING */}
//             <Menu.Item>
//                 <Tooltip title={`Track the current bounding box`}>
//                     <Button
//                         type='link'
//                         icon='import'
//                         onClick={track}
//                     >
//                         Track
//                     </Button>
//                 </Tooltip>
//             </Menu.Item>
//             {/* ISL END */}
//         </Menu>
//     );
// }

// interface ItemTopComponentProps {
//     clientID: number;
//     serverID: number | undefined;
//     labelID: number;
//     labels: any[];
//     shapeType: ShapeType;
//     objectType: ObjectType;
//     type: string;
//     locked: boolean;
//     copyShortcut: string;
//     pasteShortcut: string;
//     propagateShortcut: string;
//     toBackgroundShortcut: string;
//     toForegroundShortcut: string;
//     removeShortcut: string;
//     changeLabel(labelID: string): void;
//     copy(): void;
//     remove(): void;
//     propagate(): void;
//     createURL(): void;
//     switchOrientation(): void;
//     toBackground(): void;
//     toForeground(): void;
//     resetCuboidPerspective(): void;
//     // ISL AUTOFIT
//     autoFit(): void;
//     // ISL END
//     // ISL INTERPOLATION
//     asLastKeyframe(): void;
//     // ISL END
//     // ISL TRACKING
//     track(): void;
//     // ISL END
// }

// function ItemTopComponent(props: ItemTopComponentProps): JSX.Element {
//     const {
//         clientID,
//         serverID,
//         labelID,
//         labels,
//         shapeType,
//         objectType,
//         type,
//         locked,
//         copyShortcut,
//         pasteShortcut,
//         propagateShortcut,
//         toBackgroundShortcut,
//         toForegroundShortcut,
//         removeShortcut,
//         changeLabel,
//         copy,
//         remove,
//         propagate,
//         createURL,
//         switchOrientation,
//         toBackground,
//         toForeground,

//         resetCuboidPerspective,
//         // ISL AUTOFIT
//         autoFit,
//         // ISL END
//         // ISL INTERPOLATION
//         asLastKeyframe,
//         // ISL END
//         // ISL TRACKING
//         track,
//         // ISL END
//     } = props;

//     return (
//         <Row type='flex' align='middle'>
//             <Col span={10}>
//                 <Text style={{ fontSize: 12 }}>{clientID}</Text>
//                 <br />
//                 <Text type='secondary' style={{ fontSize: 10 }}>{type}</Text>
//             </Col>
//             <Col span={12}>
//                 <Tooltip title='Change current label'>
//                     <Select
//                         size='small'
//                         value={`${labelID}`}
//                         onChange={changeLabel}
//                         showSearch
//                         filterOption={(input: string, option: React.ReactElement<OptionProps>) => {
//                             const { children } = option.props;
//                             if (typeof (children) === 'string') {
//                                 return children.toLowerCase().includes(input.toLowerCase());
//                             }

//                             return false;
//                         }}
//                     >
//                         { labels.map((label: any): JSX.Element => (
//                             <Select.Option key={label.id} value={`${label.id}`}>
//                                 {label.name}
//                             </Select.Option>
//                         ))}
//                     </Select>
//                 </Tooltip>
//             </Col>
//             <Col span={2}>
//                 <Dropdown
//                     placement='bottomLeft'
//                     overlay={ItemMenu(
//                         serverID,
//                         locked,
//                         shapeType,
//                         objectType,
//                         copyShortcut,
//                         pasteShortcut,
//                         propagateShortcut,
//                         toBackgroundShortcut,
//                         toForegroundShortcut,
//                         removeShortcut,
//                         copy,
//                         remove,
//                         propagate,
//                         createURL,
//                         switchOrientation,
//                         toBackground,
//                         toForeground,
//                         resetCuboidPerspective,
//                         // ISL AUTOFIT
//                         autoFit,
//                         // ISL
//                         // ISL INTERPOLATION
//                         asLastKeyframe,
//                         // ISL END
//                         // ISL INTERPOLATION
//                         track,
//                         // ISL END
//                     )}
//                 >
//                     <Icon type='more' />
//                 </Dropdown>
//             </Col>
//         </Row>
//     );
// }

// const ItemTop = React.memo(ItemTopComponent);

// interface ItemButtonsComponentProps {
//     objectType: ObjectType;
//     shapeType: ShapeType;
//     occluded: boolean;
//     outside: boolean | undefined;
//     locked: boolean;
//     pinned: boolean;
//     hidden: boolean;
//     keyframe: boolean | undefined;
//     switchOccludedShortcut: string;
//     switchOutsideShortcut: string;
//     switchLockShortcut: string;
//     switchHiddenShortcut: string;
//     switchKeyFrameShortcut: string;
//     nextKeyFrameShortcut: string;
//     prevKeyFrameShortcut: string;
//     asLastKeyframeShortcut: void;
//     navigateFirstKeyframe: null | (() => void);
//     navigatePrevKeyframe: null | (() => void);
//     navigateNextKeyframe: null | (() => void);
//     navigateLastKeyframe: null | (() => void);

//     setOccluded(): void;
//     unsetOccluded(): void;
//     setOutside(): void;
//     unsetOutside(): void;
//     setKeyframe(): void;
//     unsetKeyframe(): void;
//     // ISL INTERPOLATION
//     asLastKeyframe(): void;
//     // ISL END
//     lock(): void;
//     unlock(): void;
//     pin(): void;
//     unpin(): void;
//     hide(): void;
//     show(): void;
//     // ISL INTERPOLATION
//     track(): void;
//     // ISL END
// }

// function ItemButtonsComponent(props: ItemButtonsComponentProps): JSX.Element {
//     const {
//         objectType,
//         shapeType,
//         occluded,
//         outside,
//         locked,
//         pinned,
//         hidden,
//         keyframe,
//         switchOccludedShortcut,
//         switchOutsideShortcut,
//         switchLockShortcut,
//         switchHiddenShortcut,
//         switchKeyFrameShortcut,
//         nextKeyFrameShortcut,
//         prevKeyFrameShortcut,
//         asLastKeyframeShortcut,
//         navigateFirstKeyframe,
//         navigatePrevKeyframe,
//         navigateNextKeyframe,
//         navigateLastKeyframe,

//         setOccluded,
//         unsetOccluded,
//         setOutside,
//         unsetOutside,
//         setKeyframe,
//         unsetKeyframe,
//         // ISL INTERPOLATION
//         asLastKeyframe,
//         // ISL END
//         lock,
//         unlock,
//         pin,
//         unpin,
//         hide,
//         show,
//     } = props;

//     if (objectType === ObjectType.TRACK) {
//         return (
//             <Row type='flex' align='middle' justify='space-around'>
//                 <Col span={20} style={{ textAlign: 'center' }}>
//                     <Row type='flex' justify='space-around'>
//                         <Col>
//                             {navigateFirstKeyframe
//                                 ? <Icon component={FirstIcon} onClick={navigateFirstKeyframe} />
//                                 : <Icon component={FirstIcon} style={{ opacity: 0.5, pointerEvents: 'none' }} />}
//                         </Col>
//                         <Col>
//                             {navigatePrevKeyframe
//                                 ? (
//                                     <Tooltip title={`Go to previous keyframe ${prevKeyFrameShortcut}`}>
//                                         <Icon
//                                             component={PreviousIcon}
//                                             onClick={navigatePrevKeyframe}
//                                         />
//                                     </Tooltip>
//                                 )
//                                 : <Icon component={PreviousIcon} style={{ opacity: 0.5, pointerEvents: 'none' }} />}
//                         </Col>
//                         <Col>
//                             {navigateNextKeyframe
//                                 ? (
//                                     <Tooltip title={`Go to next keyframe ${nextKeyFrameShortcut}`}>
//                                         <Icon
//                                             component={NextIcon}
//                                             onClick={navigateNextKeyframe}
//                                         />
//                                     </Tooltip>
//                                 )
//                                 : <Icon component={NextIcon} style={{ opacity: 0.5, pointerEvents: 'none' }} />}
//                         </Col>
//                         <Col>
//                             {navigateLastKeyframe
//                                 ? <Icon component={LastIcon} onClick={navigateLastKeyframe} />
//                                 : <Icon component={LastIcon} style={{ opacity: 0.5, pointerEvents: 'none' }} />}
//                         </Col>
//                     </Row>
//                     <Row type='flex' justify='space-around'>
//                         <Col>
//                             <Tooltip title={`Switch outside property ${switchOutsideShortcut}`}>
//                                 {outside
//                                     ? <Icon component={ObjectOutsideIcon} onClick={unsetOutside} />
//                                     : <Icon type='select' onClick={setOutside} />}
//                             </Tooltip>
//                         </Col>
//                         <Col>
//                             <Tooltip title={`Switch lock property ${switchLockShortcut}`}>
//                                 { locked
//                                     ? <Icon type='lock' theme='filled' onClick={unlock} />
//                                     : <Icon type='unlock' onClick={lock} />}
//                             </Tooltip>
//                         </Col>
//                         <Col>
//                             <Tooltip title={`Switch occluded property ${switchOccludedShortcut}`}>
//                                 {occluded
//                                     ? <Icon type='team' onClick={unsetOccluded} />
//                                     : <Icon type='user' onClick={setOccluded} />}
//                             </Tooltip>
//                         </Col>
//                         <Col>
//                             <Tooltip title={`Switch hidden property ${switchHiddenShortcut}`}>
//                                 { hidden
//                                     ? <Icon type='eye-invisible' theme='filled' onClick={show} />
//                                     : <Icon type='eye' onClick={hide} />}
//                             </Tooltip>
//                         </Col>
//                         <Col>
//                             <Tooltip title={`Switch keyframe property ${switchKeyFrameShortcut}`}>
//                                 {keyframe
//                                     ? <Icon type='star' theme='filled' onClick={unsetKeyframe} />
//                                     : <Icon type='star' onClick={setKeyframe} />}
//                             </Tooltip>
//                         </Col>
//                         {/* ISL INTERPOLATION */}
//                         <Col>
//                             <Tooltip title={`No interpolation ${asLastKeyframeShortcut}`}>
//                                 {keyframe
//                                     ? <Icon type='environment' theme='filled' onClick={asLastKeyframe} />
//                                     : <Icon type='environment' onClick={asLastKeyframe} />}
//                             </Tooltip>
//                         </Col>
//                         {/* ISL END */}
//                         {
//                             shapeType !== ShapeType.POINTS && (
//                                 <Col>
//                                     <Tooltip title='Switch pinned property'>
//                                         {pinned
//                                             ? <Icon type='pushpin' theme='filled' onClick={unpin} />
//                                             : <Icon type='pushpin' onClick={pin} />}
//                                     </Tooltip>
//                                 </Col>
//                             )
//                         }
//                     </Row>
//                 </Col>
//             </Row>
//         );
//     }

//     if (objectType === ObjectType.TAG) {
//         return (
//             <Row type='flex' align='middle' justify='space-around'>
//                 <Col span={20} style={{ textAlign: 'center' }}>
//                     <Row type='flex' justify='space-around'>
//                         <Col>
//                             <Tooltip title={`Switch lock property ${switchLockShortcut}`}>
//                                 { locked
//                                     ? <Icon type='lock' onClick={unlock} theme='filled' />
//                                     : <Icon type='unlock' onClick={lock} />}
//                             </Tooltip>
//                         </Col>
//                     </Row>
//                 </Col>
//             </Row>
//         );
//     }

//     return (
//         <Row type='flex' align='middle' justify='space-around'>
//             <Col span={20} style={{ textAlign: 'center' }}>
//                 <Row type='flex' justify='space-around'>
//                     <Col>
//                         <Tooltip title={`Switch lock property ${switchLockShortcut}`}>
//                             { locked
//                                 ? <Icon type='lock' onClick={unlock} theme='filled' />
//                                 : <Icon type='unlock' onClick={lock} />}
//                         </Tooltip>
//                     </Col>
//                     <Col>
//                         <Tooltip title={`Switch occluded property ${switchOccludedShortcut}`}>
//                             {occluded
//                                 ? <Icon type='team' onClick={unsetOccluded} />
//                                 : <Icon type='user' onClick={setOccluded} />}
//                         </Tooltip>
//                     </Col>
//                     <Col>
//                         <Tooltip title={`Switch hidden property ${switchHiddenShortcut}`}>
//                             {hidden
//                                 ? <Icon type='eye-invisible' onClick={show} />
//                                 : <Icon type='eye' onClick={hide} />}
//                         </Tooltip>
//                     </Col>
//                     {
//                         shapeType !== ShapeType.POINTS && (
//                             <Col>
//                                 <Tooltip title='Switch pinned property'>
//                                     {pinned
//                                         ? <Icon type='pushpin' theme='filled' onClick={unpin} />
//                                         : <Icon type='pushpin' onClick={pin} />}
//                                 </Tooltip>
//                             </Col>
//                         )
//                     }
//                 </Row>
//             </Col>
//         </Row>
//     );
// }

// const ItemButtons = React.memo(ItemButtonsComponent);

// interface ItemAttributeComponentProps {
//     attrInputType: string;
//     attrValues: string[];
//     attrValue: string;
//     attrName: string;
//     attrID: number;
//     changeAttribute(attrID: number, value: string): void;
// }

// function attrIsTheSame(
//     prevProps: ItemAttributeComponentProps,
//     nextProps: ItemAttributeComponentProps,
// ): boolean {
//     return nextProps.attrID === prevProps.attrID
//         && nextProps.attrValue === prevProps.attrValue
//         && nextProps.attrName === prevProps.attrName
//         && nextProps.attrInputType === prevProps.attrInputType
//         && nextProps.attrValues
//             .map((value: string, id: number): boolean => prevProps.attrValues[id] === value)
//             .every((value: boolean): boolean => value);
// }

// function ItemAttributeComponent(props: ItemAttributeComponentProps): JSX.Element {
//     const {
//         attrInputType,
//         attrValues,
//         attrValue,
//         attrName,
//         attrID,
//         changeAttribute,
//     } = props;

//     if (attrInputType === 'checkbox') {
//         return (
//             <Col span={24}>
//                 <Checkbox
//                     className='cvat-object-item-checkbox-attribute'
//                     checked={attrValue === 'true'}
//                     onChange={(event: CheckboxChangeEvent): void => {
//                         const value = event.target.checked ? 'true' : 'false';
//                         changeAttribute(attrID, value);
//                     }}
//                 >
//                     <Text strong className='cvat-text'>
//                         {attrName}
//                     </Text>
//                 </Checkbox>
//             </Col>
//         );
//     }

//     if (attrInputType === 'radio') {
//         return (
//             <Col span={24}>
//                 <fieldset className='cvat-object-item-radio-attribute'>
//                     <legend>
//                         <Text strong className='cvat-text'>{attrName}</Text>
//                     </legend>
//                     <Radio.Group
//                         size='small'
//                         value={attrValue}
//                         onChange={(event: RadioChangeEvent): void => {
//                             changeAttribute(attrID, event.target.value);
//                         }}
//                     >
//                         {attrValues.map((value: string): JSX.Element => (
//                             <Radio key={value} value={value}>
//                                 {value === consts.UNDEFINED_ATTRIBUTE_VALUE
//                                     ? consts.NO_BREAK_SPACE : value}
//                             </Radio>
//                         ))}
//                     </Radio.Group>
//                 </fieldset>
//             </Col>
//         );
//     }

//     if (attrInputType === 'select') {
//         return (
//             <>
//                 <Col span={24}>
//                     <Text strong className='cvat-text'>
//                         {attrName}
//                     </Text>
//                 </Col>
//                 <Col span={24}>
//                     <Select
//                         size='small'
//                         onChange={(value: string): void => {
//                             changeAttribute(attrID, value);
//                         }}
//                         value={attrValue}
//                         className='cvat-object-item-select-attribute'
//                     >
//                         {attrValues.map((value: string): JSX.Element => (
//                             <Select.Option key={value} value={value}>
//                                 {value === consts.UNDEFINED_ATTRIBUTE_VALUE
//                                     ? consts.NO_BREAK_SPACE : value}
//                             </Select.Option>
//                         ))}
//                     </Select>
//                 </Col>
//             </>
//         );
//     }

//     if (attrInputType === 'number') {
//         const [min, max, step] = attrValues.map((value: string): number => +value);

//         return (
//             <>
//                 <Col span={24}>
//                     <Text strong className='cvat-text'>
//                         {attrName}
//                     </Text>
//                 </Col>
//                 <Col span={24}>
//                     <InputNumber
//                         size='small'
//                         onChange={(value: number | undefined): void => {
//                             if (typeof (value) === 'number') {
//                                 changeAttribute(
//                                     attrID, `${clamp(value, min, max)}`,
//                                 );
//                             }
//                         }}
//                         value={+attrValue}
//                         className='cvat-object-item-number-attribute'
//                         min={min}
//                         max={max}
//                         step={step}
//                     />
//                 </Col>
//             </>
//         );
//     }

//     return (
//         <>
//             <Col span={24}>
//                 <Text strong className='cvat-text'>
//                     {attrName}
//                 </Text>
//             </Col>
//             <Col span={24}>
//                 <Input
//                     size='small'
//                     onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
//                         changeAttribute(attrID, event.target.value);
//                     }}
//                     value={attrValue}
//                     className='cvat-object-item-text-attribute'
//                 />
//             </Col>
//         </>
//     );
// }

// const ItemAttribute = React.memo(ItemAttributeComponent, attrIsTheSame);


// interface ItemAttributesComponentProps {
//     collapsed: boolean;
//     attributes: any[];
//     values: Record<number, string>;
//     changeAttribute(attrID: number, value: string): void;
//     collapse(): void;
// }

// function attrValuesAreEqual(next: Record<number, string>, prev: Record<number, string>): boolean {
//     const prevKeys = Object.keys(prev);
//     const nextKeys = Object.keys(next);

//     return nextKeys.length === prevKeys.length
//         && nextKeys.map((key: string): boolean => prev[+key] === next[+key])
//             .every((value: boolean) => value);
// }

// function attrAreTheSame(
//     prevProps: ItemAttributesComponentProps,
//     nextProps: ItemAttributesComponentProps,
// ): boolean {
//     return nextProps.collapsed === prevProps.collapsed
//         && nextProps.attributes === prevProps.attributes
//         && attrValuesAreEqual(nextProps.values, prevProps.values);
// }

// function ItemAttributesComponent(props: ItemAttributesComponentProps): JSX.Element {
//     const {
//         collapsed,
//         attributes,
//         values,
//         changeAttribute,
//         collapse,
//     } = props;

//     const sorted = [...attributes]
//         .sort((a: any, b: any): number => a.inputType.localeCompare(b.inputType));

//     return (
//         <Row>
//             <Collapse
//                 className='cvat-objects-sidebar-state-item-collapse'
//                 activeKey={collapsed ? [] : ['details']}
//                 onChange={collapse}
//             >
//                 <Collapse.Panel
//                     header={<span style={{ fontSize: '11px' }}>Details</span>}
//                     key='details'
//                 >
//                     {sorted.map((attribute: any): JSX.Element => (
//                         <Row
//                             key={attribute.id}
//                             type='flex'
//                             align='middle'
//                             justify='start'
//                             className='cvat-object-item-attribute-wrapper'
//                         >
//                             <ItemAttribute
//                                 attrValue={values[attribute.id]}
//                                 attrInputType={attribute.inputType}
//                                 attrName={attribute.name}
//                                 attrID={attribute.id}
//                                 attrValues={attribute.values}
//                                 changeAttribute={changeAttribute}
//                             />
//                         </Row>
//                     ))}
//                 </Collapse.Panel>
//             </Collapse>
//         </Row>
//     );
// }

// const ItemAttributes = React.memo(ItemAttributesComponent, attrAreTheSame);

interface Props {
    normalizedKeyMap: Record<string, string>;
    activated: boolean;
    objectType: ObjectType;
    shapeType: ShapeType;
    clientID: number;
    serverID: number | undefined;
    labelID: number;
    locked: boolean;
    attrValues: Record<number, string>;
    color: string;
    colorBy: ColorBy;

    labels: any[];
    attributes: any[];
    collapsed: boolean;

    activate(): void;
    copy(): void;
    propagate(): void;
    createURL(): void;
    switchOrientation(): void;
    toBackground(): void;
    toForeground(): void;
    remove(): void;
    // setOccluded(): void;
    // unsetOccluded(): void;
    // setOutside(): void;
    // unsetOutside(): void;
    // setKeyframe(): void;
    // unsetKeyframe(): void;
    // ISL INTERPOLATION
    // asLastKeyframe(): void;
    // ISL END
    // lock(): void;
    // unlock(): void;
    // pin(): void;
    // unpin(): void;
    // hide(): void;
    // show(): void;
    changeLabel(labelID: string): void;
    changeAttribute(attrID: number, value: string): void;
    changeColor(color: string): void;
    collapse(): void;
    resetCuboidPerspective(): void;
    // ISL AUTOFIT
    autoFit(): void,
    // ISL END
    // ISL TRACKING
    track(): void,
    // ISL END
    activateTracking(): void;
}

function objectItemsAreEqual(prevProps: Props, nextProps: Props): boolean {
    return nextProps.activated === prevProps.activated
        && nextProps.locked === prevProps.locked
        && nextProps.labelID === prevProps.labelID
        && nextProps.color === prevProps.color
        && nextProps.clientID === prevProps.clientID
        && nextProps.serverID === prevProps.serverID
        && nextProps.objectType === prevProps.objectType
        && nextProps.shapeType === prevProps.shapeType
        && nextProps.collapsed === prevProps.collapsed
        && nextProps.labels === prevProps.labels
        && nextProps.attributes === prevProps.attributes
        && nextProps.normalizedKeyMap === prevProps.normalizedKeyMap
        && nextProps.colorBy === prevProps.colorBy
        && attrValuesAreEqual(nextProps.attrValues, prevProps.attrValues);
}

function ObjectItemComponent(props: Props): JSX.Element {
    const {
        activated,
        objectType,
        shapeType,
        clientID,
        serverID,
        locked,
        attrValues,
        labelID,
        color,
        colorBy,

        attributes,
        labels,
        collapsed,
        normalizedKeyMap,

        activate,
        copy,
        propagate,
        createURL,
        switchOrientation,
        toBackground,
        toForeground,
        remove,
        setOccluded,
        unsetOccluded,
        setOutside,
        unsetOutside,
        setKeyframe,
        unsetKeyframe,
        // ISL INTERPOLATION
        asLastKeyframe,
        // ISL END
        lock,
        unlock,
        pin,
        unpin,
        hide,
        show,
        changeLabel,
        changeAttribute,
        changeColor,
        collapse,
        resetCuboidPerspective,
        // ISL AUTOFIT
        autoFit,
        // ISL END
        // ISL AUTOFIT
        track,
        // ISL END
        activateTracking,
    } = props;

    const type = objectType === ObjectType.TAG ? ObjectType.TAG.toUpperCase()
        : `${shapeType.toUpperCase()} ${objectType.toUpperCase()}`;

    const className = !activated ? 'cvat-objects-sidebar-state-item'
        : 'cvat-objects-sidebar-state-item cvat-objects-sidebar-state-active-item';

    return (
        <div style={{ display: 'flex', marginBottom: '1px' }}>
            <div
                className='cvat-objects-sidebar-state-item-color'
                style={{ background: `${color}` }}
            />
            <div
                onMouseEnter={activate}
                id={`cvat-objects-sidebar-state-item-${clientID}`}
                className={className}
                style={{ backgroundColor: `${color}88` }}
            >
                <ItemBasics
                    serverID={serverID}
                    clientID={clientID}
                    labelID={labelID}
                    labels={labels}
                    shapeType={shapeType}
                    objectType={objectType}
                    color={color}
                    colorBy={colorBy}
                    type={type}
                    locked={locked}
                    copyShortcut={normalizedKeyMap.COPY_SHAPE}
                    pasteShortcut={normalizedKeyMap.PASTE_SHAPE}
                    propagateShortcut={normalizedKeyMap.PROPAGATE_OBJECT}
                    toBackgroundShortcut={normalizedKeyMap.TO_BACKGROUND}
                    toForegroundShortcut={normalizedKeyMap.TO_FOREGROUND}
                    removeShortcut={normalizedKeyMap.DELETE_OBJECT}
                    changeColorShortcut={normalizedKeyMap.CHANGE_OBJECT_COLOR}
                    changeLabel={changeLabel}
                    changeColor={changeColor}
                    copy={copy}
                    remove={remove}
                    propagate={propagate}
                    createURL={createURL}
                    switchOrientation={switchOrientation}
                    toBackground={toBackground}
                    toForeground={toForeground}
                    resetCuboidPerspective={resetCuboidPerspective}
                //     // ISL AUTOFIT
                //     autoFit={autoFit}
                //     // ISL END
                //     // ISL INTERPOLATION
                //     asLastKeyframe={asLastKeyframe}
                //     // ISL END
                //     // ISL TRACKING
                //     track={track}
                //     // ISL END
                // />
                // <ItemButtons
                //     shapeType={shapeType}
                //     objectType={objectType}
                //     occluded={occluded}
                //     outside={outside}
                //     locked={locked}
                //     pinned={pinned}
                //     hidden={hidden}
                //     keyframe={keyframe}
                //     switchOccludedShortcut={normalizedKeyMap.SWITCH_OCCLUDED}
                //     switchOutsideShortcut={normalizedKeyMap.SWITCH_OUTSIDE}
                //     switchLockShortcut={normalizedKeyMap.SWITCH_LOCK}
                //     switchHiddenShortcut={normalizedKeyMap.SWITCH_HIDDEN}
                //     switchKeyFrameShortcut={normalizedKeyMap.SWITCH_KEYFRAME}
                //     nextKeyFrameShortcut={normalizedKeyMap.NEXT_KEY_FRAME}
                //     prevKeyFrameShortcut={normalizedKeyMap.PREV_KEY_FRAME}
                //     navigateFirstKeyframe={navigateFirstKeyframe}
                //     navigatePrevKeyframe={navigatePrevKeyframe}
                //     navigateNextKeyframe={navigateNextKeyframe}
                //     navigateLastKeyframe={navigateLastKeyframe}
                //     setOccluded={setOccluded}
                //     unsetOccluded={unsetOccluded}
                //     setOutside={setOutside}
                //     unsetOutside={unsetOutside}
                //     setKeyframe={setKeyframe}
                //     unsetKeyframe={unsetKeyframe}
                //     // ISL INTERPOLATION
                //     asLastKeyframe={asLastKeyframe}
                //     asLastKeyframeShortcut={normalizedKeyMap.INTERPOLATION}
                //     // ISL END
                //     lock={lock}
                //     unlock={unlock}
                //     pin={pin}
                //     unpin={unpin}
                //     hide={hide}
                //     show={show}
                //     // ISL TRACKING
                //     track={track}
                //     // ISL END
                    activateTracking={activateTracking}
                />
                <ObjectButtonsContainer
                    clientID={clientID}
                />
                {!!attributes.length
                    && (
                        <ItemDetails
                            collapsed={collapsed}
                            attributes={attributes}
                            values={attrValues}
                            collapse={collapse}
                            changeAttribute={changeAttribute}
                        />
                    )}
            </div>
        </div>
    );
}

export default React.memo(ObjectItemComponent, objectItemsAreEqual);

// Copyright (C) 2020 Intel Corporation
//
// SPDX-License-Identifier: MIT

import './styles.scss';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'antd/lib/grid';
import Layout from 'antd/lib/layout';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import Menu from 'antd/lib/menu';
import Dropdown from 'antd/lib/dropdown';
import Modal from 'antd/lib/modal';
import Text from 'antd/lib/typography/Text';

import { CVATLogo, AccountIcon } from 'icons';
import consts from 'consts';
import SettingsModal from './settings-modal/settings-modal';
import { showStatistics } from 'actions/annotation-actions';

interface HeaderContainerProps {
    onLogout: () => void;
    switchSettingsDialog: (show: boolean) => void;
    logoutFetching: boolean;
    installedAnalytics: boolean;
    installedAutoAnnotation: boolean;
    installedTFAnnotation: boolean;
    installedTFSegmentation: boolean;
    serverHost: string;
    username: string;
    toolName: string;
    serverVersion: string;
    serverDescription: string;
    coreVersion: string;
    canvasVersion: string;
    uiVersion: string;
    switchSettingsShortcut: string;
    settingsDialogShown: boolean;
}

type Props = HeaderContainerProps & RouteComponentProps;

function HeaderContainer(props: Props): JSX.Element {
    const {
        installedTFSegmentation,
        installedAutoAnnotation,
        installedTFAnnotation,
        installedAnalytics,
        username,
        toolName,
        serverHost,
        serverVersion,
        serverDescription,
        coreVersion,
        canvasVersion,
        uiVersion,
        onLogout,
        logoutFetching,
        settingsDialogShown,
        switchSettingsShortcut,
        switchSettingsDialog,
    } = props;

    const renderModels = installedAutoAnnotation
        || installedTFAnnotation
        || installedTFSegmentation;

    const {
        CHANGELOG_URL,
        LICENSE_URL,
        GITTER_URL,
        FORUM_URL,
        GITHUB_URL,
    } = consts;

    function aboutModal(): void {
        Modal.info({
            title: `${toolName}`,
            content: (
                <div>
                    <p>
                        {`${serverDescription}`}
                    </p>
                    <p>
                        <Text strong>
                            Server version:
                        </Text>
                        <Text type='secondary'>
                            {` ${serverVersion}`}
                        </Text>
                    </p>
                    <p>
                        <Text strong>
                            Core version:
                        </Text>
                        <Text type='secondary'>
                            {` ${coreVersion}`}
                        </Text>
                    </p>
                    <p>
                        <Text strong>
                            Canvas version:
                        </Text>
                        <Text type='secondary'>
                            {` ${canvasVersion}`}
                        </Text>
                    </p>
                    <p>
                        <Text strong>
                            UI version:
                        </Text>
                        <Text type='secondary'>
                            {` ${uiVersion}`}
                        </Text>
                    </p>
                    <Row type='flex' justify='space-around'>
                        <Col><a href={CHANGELOG_URL} target='_blank' rel='noopener noreferrer'>{'What\'s new?'}</a></Col>
                        <Col><a href={LICENSE_URL} target='_blank' rel='noopener noreferrer'>License</a></Col>
                        <Col><a href={GITTER_URL} target='_blank' rel='noopener noreferrer'>Need help?</a></Col>
                        <Col><a href={FORUM_URL} target='_blank' rel='noopener noreferrer'>Forum on Intel Developer Zone</a></Col>
                    </Row>
                </div>
            ),
            width: 800,
            okButtonProps: {
                style: {
                    width: '100px',
                },
            },
        });
    }

    // ISL MODAL HELP
    function helpModal(): void {
        Modal.info({
            title: 'CVAT User Guide',
            content: (

                <div className="clearfix">
                    <table>
                        <thead>
                            <tr>
                                <th>Shortcut</th>
                                <th>Common</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td><em>Main functions</em></td>
                            </tr>
                            <tr>
                                <td><code>F2</code></td>
                                <td>Open/hide the list of available shortcuts</td>
                            </tr>
                            <tr>
                                <td><code>F3</code></td>
                                <td>Go to the settings page or go back</td>
                            </tr>
                            <tr>
                                <td><code>Ctrl+S</code></td>
                                <td>Go to the settings page or go back</td>
                            </tr>
                            <tr>
                                <td><code>Ctrl+Z</code></td>
                                <td>Cancel the latest action related with objects</td>
                            </tr>
                            <tr>
                                <td><code>Ctrl+Shift+Z</code> or <code>Ctrl+Y</code></td>
                                <td>Cancel undo action</td>
                            </tr>
                            <tr>
                                <td>Hold <code>Mouse Wheel</code></td>
                                <td>To move an image frame (for example, while drawing)</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><em>Player</em></td>
                            </tr>
                            <tr>
                                <td><code>F</code></td>
                                <td>Go to the next frame</td>
                            </tr>
                            <tr>
                                <td><code>D</code></td>
                                <td>Go to the previous frame</td>
                            </tr>
                            <tr>
                                <td><code>V</code></td>
                                <td>Go forward with a step</td>
                            </tr>
                            <tr>
                                <td><code>C</code></td>
                                <td>Go backward with a step</td>
                            </tr>
                            <tr>
                                <td><code>Right</code></td>
                                <td>Search the next frame that satisfies to the filters  or next frame which contain any objects </td>
                            </tr>
                                <tr>
                                    <td><code>Left</code></td>
                                    <td>Search the previous frame that satisfies to the filters  or previous frame which contain any objects</td>
                                </tr>
                                    <tr>
                                        <td><code>Space</code></td>
                                        <td>Start/stop automatic changing frames</td>
                                    </tr>
                                    <tr>
                                        <td><code>` </code> or <code>~</code></td>
                                        <td>Focus on the element to change the current frame</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td><em>Modes</em></td>
                                    </tr>
                                    <tr>
                                        <td><code>N</code></td>
                                        <td>Repeat the latest procedure of drawing with the same parameters</td>
                                    </tr>
                                    <tr>
                                        <td><code>M</code></td>
                                        <td>Activate or deactivate mode to merging shapes</td>
                                    </tr>
                                    <tr>
                                        <td><code>G</code></td>
                                        <td>Activate or deactivate mode to grouping shapes</td>
                                    </tr>
                                    <tr>
                                        <td><code>Shift+G</code></td>
                                        <td>Reset group for selected shapes (in group mode)</td>
                                    </tr>
                                    <tr>
                                        <td><code>Esc</code></td>
                                        <td>Cancel any active canvas mode</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td><em>Image operations</em></td>
                                    </tr>
                                    <tr>
                                        <td><code>Ctrl+R</code></td>
                                        <td>Change image angle (add 90 degrees)</td>
                                    </tr>
                                    <tr>
                                        <td><code>Ctrl+Shift+R</code></td>
                                        <td>Change image angle (substract 90 degrees)</td>
                                    </tr>
                                    <tr>
                                        <td><code>Shift+B+=</code></td>
                                        <td>Increase brightness level for the image</td>
                                    </tr>
                                    <tr>
                                        <td><code>Shift+B+-</code></td>
                                        <td>Decrease brightness level for the image</td>
                                    </tr>
                                    <tr>
                                        <td><code>Shift+C+=</code></td>
                                        <td>Increase contrast level for the image</td>
                                    </tr>
                                    <tr>
                                        <td><code>Shift+C+-</code></td>
                                        <td>Decrease contrast level for the image</td>
                                    </tr>
                                    <tr>
                                        <td><code>Shift+S+=</code></td>
                                        <td>Increase saturation level for the image</td>
                                    </tr>
                                    <tr>
                                        <td><code>Shift+S+-</code></td>
                                        <td>Increase contrast level for the image</td>
                                    </tr>
                                    <tr>
                                        <td><code>Shift+G+=</code></td>
                                        <td>Make the grid more visible</td>
                                    </tr>
                                    <tr>
                                        <td><code>Shift+G+-</code></td>
                                        <td>Make the grid less visible</td>
                                    </tr>
                                    <tr>
                                        <td><code>Shift+G+Enter</code></td>
                                        <td>Set another color for the image grid</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td><em>Operations with objects</em></td>
                                    </tr>
                                    <tr>
                                        <td><code>Ctrl</code></td>
                                        <td>Switch automatic bordering for polygons and polylines during drawing/editing</td>
                                    </tr>
                                    <tr>
                                        <td>Hold <code>Ctrl</code></td>
                                        <td>When the shape is active and fix it</td>
                                    </tr>
                                    <tr>
                                        <td><code>Ctrl+Double-Click</code> on point</td>
                                        <td>Deleting a point (used when hovering over a point of polygon, polyline, points)</td>
                                    </tr>
                                    <tr>
                                        <td><code>Shift+Double-Click</code> on point</td>
                                        <td>Editing a shape (used when hovering over a point of polygon, polyline or points)</td>
                                    </tr>
                                    <tr>
                                        <td><code>Right-Click</code> on shape</td>
                                        <td>Display of an object element from objects sidebar</td>
                                    </tr>
                                    <tr>
                                        <td><code>T+L</code></td>
                                        <td>Change locked state for all objects in the sidebar</td>
                                    </tr>
                                    <tr>
                                        <td><code>L</code></td>
                                        <td>Change locked state for an active object</td>
                                    </tr>
                                    <tr>
                                        <td><code>T+H</code></td>
                                        <td>Change hidden state for objects in the sidebar</td>
                                    </tr>
                                    <tr>
                                        <td><code>H</code></td>
                                        <td>Change hidden state for an active object</td>
                                    </tr>
                                    <tr>
                                        <td><code>Q</code> or <code>/</code></td>
                                        <td>Change occluded property for an active object</td>
                                    </tr>
                                    <tr>
                                        <td><code>Del</code> or <code>Shift+Del</code></td>
                                        <td>Delete an active object. Use shift to force delete of locked objects</td>
                                    </tr>
                                    <tr>
                                        <td><code>-</code> or <code>_</code></td>
                                        <td>Put an active object &quot;farther&quot; from the user (decrease z axis value)</td>
                                    </tr>
                                    <tr>
                                        <td><code>+</code> or <code>=</code></td>
                                        <td>Put an active object &quot;closer&quot; to the user (increase z axis value)</td>
                                    </tr>
                                    <tr>
                                        <td><code>Ctrl+C</code></td>
                                        <td>Copy shape to CVAT internal clipboard</td>
                                    </tr>
                                    <tr>
                                        <td><code>Ctrl+V</code></td>
                                        <td>Paste a shape from internal CVAT clipboard</td>
                                    </tr>
                                    <tr>
                                        <td>Hold <code>Ctrl</code> while pasting</td>
                                        <td>When pasting shape from the buffer for multiple pasting.</td>
                                    </tr>
                                    <tr>
                                        <td><code>Crtl+B</code></td>
                                        <td>Make a copy of the object on the following frames</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td><em>Operations are available only for track</em></td>
                                    </tr>
                                    <tr>
                                        <td><code>K</code></td>
                                        <td>Change keyframe property for an active track</td>
                                    </tr>
                                    <tr>
                                        <td><code>O</code></td>
                                        <td>Change outside property for an active track</td>
                                    </tr>
                                    <tr>
                                        <td><code>R</code></td>
                                        <td>Go to the next keyframe of an active track</td>
                                    </tr>
                                    <tr>
                                        <td><code>E</code></td>
                                        <td>Go to the previous keyframe of an active track</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td><em>Attribute annotation mode</em></td>
                                    </tr>
                                    <tr>
                                        <td><code>Up Arrow</code></td>
                                        <td>Go to the next attribute (up)</td>
                                    </tr>
                                    <tr>
                                        <td><code>Down Arrow</code></td>
                                        <td>Go to the next attribute (down)</td>
                                    </tr>
                                    <tr>
                                        <td><code>Tab</code></td>
                                        <td>Go to the next annotated object in current frame</td>
                                    </tr>
                                    <tr>
                                        <td><code>Shift+Tab</code></td>
                                        <td>Go to the previous annotated object in current frame</td>
                                    </tr>
                                    <tr>
                                        <td><code>&lt;number&gt;</code></td>
                                        <td>Assign a corresponding value to the current attribute</td>
                                    </tr>
                                    </tbody>
                                            </table>

                            <span>
                                <Button
                                    className='cvat-header-button'
                                    type='link'
                                    onClick={
                                        (): void => {
                                            window.open(`${serverHost}/documentation/user_guide.html`, '_blank')
                                        }
                                    }
                                >
                                    <Icon type='question-circle' />
                                    Help
                                </Button>
                            </span>

                </div>
            ),
            width: 1000,
            style : { top: 900},
            maskClosable: true ,
            okButtonProps: {
                            style: {
                            width: '100px',
                },
            },
        });
    }
    //ISL END

    const menu = (
        <Menu className='cvat-header-menu' mode='vertical'>
                            <Menu.Item
                                title={`Press ${switchSettingsShortcut} to switch`}
                                onClick={
                                    (): void => switchSettingsDialog(true)
                                }
                            >
                                <Icon type='setting' />
                Settings
            </Menu.Item>
                            <Menu.Item onClick={() => aboutModal()}>
                                <Icon type='info-circle' />
                About
            </Menu.Item>
                            <Menu.Item
                                onClick={onLogout}
                                disabled={logoutFetching}
                            >
                                {logoutFetching ? <Icon type='loading' /> : <Icon type='logout' />}
                Logout
            </Menu.Item>

                        </Menu>
    );

    return (
        <Layout.Header className='cvat-header'>
                            <div className='cvat-left-header'>
                                <Icon className='cvat-logo-icon' component={CVATLogo} />

                                <Button
                                    className='cvat-header-button'
                                    type='link'
                                    value='tasks'
                                    onClick={
                                        (): void => props.history.push('/tasks?page=1')
                                    }
                                >
                                    Tasks
                </Button>
                                {renderModels
                                    && (
                                        <Button
                                            className='cvat-header-button'
                                            type='link'
                                            value='models'
                                            onClick={
                                                (): void => props.history.push('/models')
                                            }
                                        >
                                            Models
                                        </Button>
                                    )}
                                {installedAnalytics
                                    && (
                                        <Button
                                            className='cvat-header-button'
                                            type='link'
                                            onClick={
                                                (): void => {
                                                    // false positive
                                                    // eslint-disable-next-line
                                                    window.open(`${serverHost}/analytics/app/kibana`, '_blank');
                                                }
                                            }
                                        >
                                            Analytics
                                        </Button>
                                    )}
                            </div>
                            <div className='cvat-right-header'>
                                <Button
                                    className='cvat-header-button'
                                    type='link'
                                    onClick={
                                        (): void => {
                                            // false positive
                                            // eslint-disable-next-line security/detect-non-literal-fs-filename
                                            window.open(GITHUB_URL, '_blank');
                                        }
                                    }
                                >
                                    <Icon type='github' />
                                    <Text className='cvat-text-color'>GitHub</Text>
                                </Button>

                                {/* ISL MODAL HELP */}
                                <Button
                                    className='cvat-header-button'
                                    type='link'
                                    onClick={() => helpModal()}
                                // onClick={
                                //     (): void => {
                                //         // false positive
                                //         // eslint-disable-next-line
                                //         window.open(`${serverHost}/documentation/user_guide.html`, '_blank')
                                //     }
                                // }
                                >
                                    <Icon type='question-circle' />
                    Help
                </Button>
                                {/* ISL END */}

                                <Dropdown overlay={menu} className='cvat-header-menu-dropdown'>
                                    <span>
                                        <Icon className='cvat-header-account-icon' component={AccountIcon} />
                                        <Text strong>
                                            {username.length > 14 ? `${username.slice(0, 10)} ...` : username}
                                        </Text>
                                        <Icon className='cvat-header-menu-icon' type='caret-down' />
                                    </span>
                                </Dropdown>
                            </div>
                            <SettingsModal
                                visible={settingsDialogShown}
                                onClose={() => switchSettingsDialog(false)}
                            />
                        </Layout.Header>
    );
}

export default withRouter(HeaderContainer);

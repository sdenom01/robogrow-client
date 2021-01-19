import React from "react";
import {growService} from '../_services/grow.service';
import {growConfigService} from '../_services/grow.config.service';
import {Form, Dropdown, Button, Modal} from 'react-bootstrap';

import "./growEdit.css";

export default class GrowEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grow: props.grow,
            configs: [],
            selectedConfig: {
                name: 'Not Selected'
            }
        }

        this.handleCurrentNameChange = this.handleCurrentNameChange.bind(this);
        this.handleNewSelectedConfig = this.handleNewSelectedConfig.bind(this);
        this.handleGrowCreateOrUpdate = this.handleGrowCreateOrUpdate.bind(this);
    }

    componentDidMount() {
        growConfigService.getAll().then(configs => {
            let selectedConfig = {
                name: 'Not Selected'
            };

            configs.forEach((config) => {
                if (this.state.grow._id && config._id === this.state.grow.config._id) {
                    selectedConfig = config;
                }
            });

            this.setState({
                configs,
                selectedConfig,
                currentName: this.state.grow.name
            });
        })
    }

    handleNewSelectedConfig(newConfigId) {
        let newConfig;

        this.state.configs.forEach((config) => {
            if (config._id === newConfigId) {
                newConfig = config;
            }
        });

        this.setState({selectedConfig: newConfig});
    }

    handleCurrentNameChange(e) {
        let newName = e.target.value;

        this.setState({currentName: newName});
    }

    handleGrowCreateOrUpdate() {
        let grow = {
            ...this.state.grow,
        };

        if (this.state.currentName && this.state.currentName !== grow.name) {
            grow.name = this.state.currentName;
        }

        // check and make sure we have a config selected
        // TODO: previous code was checking for previously set grow state.  Consider updating to prevent resaving of something that has no new information
        if (this.state.selectedConfig && this.state.selectedConfig._id) {
            grow.config = this.state.selectedConfig;
        }

        let bundle = {
            _id: grow._id,
            growConfigId: grow.config._id,
            name: grow.name,
            numPlants: grow.numPlants,
            growStage: grow.growStage
        };

        if (grow && grow._id) {
            growService.updateById(bundle).then(grow => {
                window.location = '/grows/' + bundle._id;
            });
        } else {
            growService.createNew(bundle).then(grow => {
                window.location = '/grows';
            });
        }
    }

    render() {
        return (
            <Modal show={this.props.show}
                   onHide={this.props.closeModal}
                   size="lg">
                <Modal.Header>
                    <Modal.Title>
                        {
                            this.state.grow._id
                                ? "Update Grow"
                                : "New Grow"
                        }
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="ml-auto mr-auto" style={{width: "530px"}}>
                        <Form className="" onSubmit={this.handleGrowCreateOrUpdate}>
                            < Form.Group controlId="forEditGrow">
                                <Form.Label>Grow Name</Form.Label>
                                <Form.Control type="text" defaultValue={this.state.grow.name}
                                              onChange={this.handleCurrentNameChange} value={this.state.currentName}/>
                            </Form.Group>


                            <Form.Group controlId="forEditGrow">
                                <Form.Label>Selected Configuration</Form.Label>

                                <Dropdown onSelect={this.handleNewSelectedConfig}>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        {this.state.selectedConfig.name}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {
                                            this.state.configs.map((config) => {
                                                return (
                                                    <Dropdown.Item key={config._id}
                                                                   eventKey={config._id}>{config.name}</Dropdown.Item>
                                                );
                                            })
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Form.Group>

                            <Button variant="primary" type="submit">Save</Button>{' '}
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}
import React from "react";
import {growService} from '../_services/grow.service';
import {growConfigService} from '../_services/grow.config.service';
import {Form, Dropdown, Button} from 'react-bootstrap';

import "./growEdit.css";

export default class GrowEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grow: {},
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
        const {growId} = this.props.match.params;

        if (growId) {
            growService.getById(growId).then(grow => {
                growConfigService.getAll().then(configs => {
                    let selectedConfig;

                    configs.forEach((config) => {
                        if (config._id === grow.config._id) {
                            selectedConfig = config;
                        }
                    });

                    this.setState({
                        grow,
                        configs,
                        selectedConfig,
                        currentName: grow.name
                    });
                })
            })
        } else {
            growConfigService.getAll().then(configs => {
                this.setState({
                    configs
                });
            })
        }
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

        if (this.state.selectedConfig && grow.config && this.state.selectedConfig._id !== grow.config._id) {
            grow.config = this.state.selectedConfig;
        }

        // TODO: Implement Plants / Notes
        grow.numPlants = 0;

        // TODO: Implement growth stages (derrived from config)
        grow.growStage = 'N/A';

        let bundle = {
            _id: grow._id,
            configId: grow.config._id,
            name: grow.name,
            numPlants: grow.numPlants,
            growStage: grow.growStage
        };

        if (grow && grow._id) {
            console.log("UPDATE");
            growService.updateById(bundle).then(grow => {
                window.location = '/grows/' + bundle._id;
            });
        } else {
            console.log("CREATE");
            growService.createNew(bundle).then(grow => {
                window.location = '/grows/';
            });
        }
    }

    render() {
        return (
            <div className="ml-auto mr-auto jumbotron" style={{width: "530px"}}>
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
        );
    }
}
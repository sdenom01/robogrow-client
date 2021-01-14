import React from "react";
import {growConfigService} from '../../_services/grow.config.service';

import InputRange from 'react-input-range';

import {Container} from './Container';

import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

import "./growConfigDetails.css";
import "react-input-range/lib/css/index.css";
import EdiText from "react-editext";
import {Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

export default class ConfigRelayWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.updateConfiguration = this.updateConfiguration.bind(this);
        this.updateConfigRelays = this.updateConfigRelays.bind(this);
    }

    componentDidMount() {
        const {schedules} = this.props;

        this.setState({
            schedules: schedules
        })
    }

    updateConfiguration(obj) {
        let config = this.state.config;
        if (obj.type === 'temperature') {
            config.tempLow = obj.value.min;
            config.tempHigh = obj.value.max;
            this.setState({
                config: config,
            });
        } else if (obj.type === 'humidity') {
            config.humidityLow = obj.value.min;
            config.humidityHigh = obj.value.max;
            this.setState({
                config: config,
            });
        } else {
            // This check will probably be removed with https://trello.com/c/fgOjs170/79-move-acceptablerange-component-into-a-conditional-relay-ui
            config.name = obj;
        }

        growConfigService.updateById(config);
    }

    updateConfigRelays(schedule) {
        // TODO: Call up to parent function
    }


    changeStatus(sIndex, eIndex, e) {
        this.state.schedules[sIndex].events[eIndex].status = (e.target.checked) ? 0: 1;
        // updateRelayEvent(event);
    };

    saveDescription(sIndex, eIndex, e) {
        // event.Description = e;
        // updateRelayEvent(event);
    };

    saveTriggerTime(sIndex, eIndex, e) {
        // event.triggerTime = e;
        // updateRelayEvent(event);
    };

    updateRelayEvent(sIndex, eIndex, e) {
        // updateEvent(index, event);
    };

    confirmDelete(sIndex, eIndex, e) {
        // if (window.confirm("Are you sure you want to delete event: " + event.Description + "?")) {
        //     // deleteEvent(index)
        // }
    };

    createScheduledRelayRows(schedule, sIndex) {
        return (
            schedule.events.map((event, eIndex) => (
                <div className="card">
                    <div className="row pr-4">
                        <Form.Check
                            className="col-2 mt-auto mb-auto"
                            type="switch"
                            id={eIndex + "-" + event.id}
                            label=""
                            defaultChecked={(event.status == 0) ? true : false}
                            onChange={(e) => this.changeStatus(sIndex, eIndex, e)}/>

                        <div className="col-5 mt-auto mb-auto">
                            <EdiText
                                value={event.Description}
                                type="text"
                                className="form-control-sm p-0"
                                submitOnEnter={true}
                                onSave={() => this.saveDescription(sIndex, eIndex)}/>
                        </div>

                        <div className="col-4 mt-auto mb-auto">
                            <EdiText
                                value={event.triggerTime}
                                type="text"
                                className="form-control-sm p-0"
                                submitOnEnter={true}
                                onSave={() => this.saveTriggerTime(sIndex, eIndex)}/>
                        </div>

                        <div className="col-1 mt-auto mb-auto">
                            <div className="btn btn-danger" onClick={() => this.confirmDelete(event)}>
                                <FontAwesomeIcon icon={faTrash} size="1x"/>
                            </div>
                        </div>
                    </div>
                </div>
            ))
        );
    }

    createConditionalRelayRows(schedule, sIndex) {
        return (
            schedule.conditions.map(
                (condition, cIndex) => (<div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="text-white">
                                    {condition.description}
                                </div>

                                <div className="card-body">
                                    <InputRange
                                        maxValue={100}
                                        minValue={0}
                                        value={{min: condition.minValue, max: condition.maxValue}}
                                        onChange={tempValue => this.setState({tempValue})}
                                        onChangeComplete={value => this.updateConfiguration({
                                            type: 'temperature',
                                            value: value
                                        })}/>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )
        )
    }

    render() {
        if (this.state.schedules) {
            return (
                <div className="row">
                    {
                        this.state.schedules.map((schedule, sIndex) => {
                            if (schedule.type == 0) {
                                return (
                                    <div className="col-6">
                                        {schedule.name}
                                        {
                                            this.createConditionalRelayRows(schedule, sIndex)
                                        }
                                    </div>
                                )
                            } else {
                                return (
                                    <div className="col-6">
                                        {schedule.name}
                                        {
                                            this.createScheduledRelayRows(schedule, sIndex)
                                        }
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            );
        } else {
            return (<div/>);
        }
    }
}
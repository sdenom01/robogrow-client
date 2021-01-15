import React from "react";
import InputRange from 'react-input-range';

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
    }

    componentDidMount() {
        const {schedules} = this.props;

        this.setState({
            schedules: schedules
        })
    }

    changeStatus(sIndex, eIndex, e) {
        this.state.schedules[sIndex].events[eIndex].status = (e.target.checked) ? 0 : 1;
        this.props.updateConfigRelays(this.state.schedules);
    };

    saveDescription(sIndex, eIndex, e) {
        this.state.schedules[sIndex].events[eIndex].Description = e;
        this.props.updateConfigRelays(this.state.schedules);
    };

    saveTriggerTime(sIndex, eIndex, e) {
        this.state.schedules[sIndex].events[eIndex].triggerTime = e;
        this.props.updateConfigRelays(this.state.schedules);
    };

    dragConditionalRange(sIndex, cIndex, value) {
        let tempSchedules = this.state.schedules;
        tempSchedules[sIndex].conditions[cIndex].minValue = value.min;
        tempSchedules[sIndex].conditions[cIndex].maxValue = value.max;

        this.setState({
            schedules: tempSchedules
        })
    }

    updateConditionalRange(sIndex, cIndex, value) {
        this.props.updateConfigRelays(this.state.schedules);
    }

    confirmDelete(sIndex, eIndex, e) {
        if (window.confirm("Are you sure you want to delete event: " + this.state.schedules[sIndex].events[eIndex].Description + "?")) {
            this.state.schedules[sIndex].events.splice(eIndex, 1);
            this.props.updateConfigRelays(this.state.schedules);
        }
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
                                onSave={(e) => this.saveDescription(sIndex, eIndex, e)}/>
                        </div>

                        <div className="col-4 mt-auto mb-auto">
                            <EdiText
                                value={event.triggerTime}
                                type="text"
                                className="form-control-sm p-0"
                                submitOnEnter={true}
                                onSave={(e) => this.saveTriggerTime(sIndex, eIndex, e)}/>
                        </div>

                        <div className="col-1 mt-auto mb-auto">
                            <div className="btn btn-danger" onClick={() => this.confirmDelete(sIndex, eIndex)}>
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
                                        onChange={value => this.dragConditionalRange(sIndex, cIndex, value)}
                                        onChangeComplete={value => this.updateConditionalRange(sIndex, cIndex, value)}/>
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
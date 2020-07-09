import React from "react";
import {growConfigService} from '../../_services/grow.config.service';

import InputRange from 'react-input-range';

import {Container} from './Container';

import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

import "./growConfigDetails.css";
import "react-input-range/lib/css/index.css";

export default class GrowConfigDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            left: 0,
            config: {}
        };

        this.updateConfiguration = this.updateConfiguration.bind(this);
        this.updateRelaySchedules= this.updateRelaySchedules.bind(this);
    }

    componentDidMount() {
        const {configId} = this.props.match.params;

        growConfigService.getById(configId).then(config => {
            let tempValue = {min: config.tempLow, max: config.tempHigh}
            let humidityValue = {min: config.humidityLow, max: config.humidityHigh};

            this.setState({
                config: config,
                tempValue: tempValue,
                humidityValue: humidityValue
            })
        })
    }

    updateConfiguration(obj) {
        if (obj.type === 'temperature') {
            this.setState({
                tempValue: obj.value
            });
        } else {
            this.setState({
                humidityValue: obj.value
            });
        }

        growConfigService.updateById(this.state.config)
    }

    updateRelaySchedules(schedule) {
        this.state.config.relaySchedules.forEach((s) => {
            if (s.id == schedule.id) {
                s = schedule;
                console.log("Found schedule match, updating...");

                growConfigService.updateById(this.state.config).then((res) => {
                    this.setState({
                        config: this.state.config
                    })
                });
            }
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="container">
                    <h4 className="text-white">
                        {this.state.config.name}
                    </h4>

                    <br/>

                    <div className="row">
                        <div className="col-12">
                            <div className="text-white">
                                Acceptable Temperature
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <InputRange
                                        maxValue={90}
                                        minValue={50}
                                        value={this.state.tempValue}
                                        onChange={tempValue => this.setState({tempValue})}
                                        onChangeComplete={value => this.updateConfiguration({
                                            type: 'temperature',
                                            value: value
                                        })}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-12">
                            <div className="text-white">
                                Acceptable Humidity
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <InputRange
                                        maxValue={100}
                                        minValue={20}
                                        value={this.state.humidityValue}
                                        onChange={humidityValue => this.setState({humidityValue})}
                                        onChangeComplete={value => this.updateConfiguration({
                                            type: 'humidity',
                                            value: value
                                        })}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="">
                    <div className="row m-4">
                        {
                            (this.state.config.relaySchedules)
                                ? this.state.config.relaySchedules.map((schedule) => (
                                    <div key={schedule.id} className="bg-primary p-3 col-6">
                                        <DndProvider backend={HTML5Backend}>
                                            <Container schedule={schedule} updateRelaySchedules={this.updateRelaySchedules}/>
                                        </DndProvider>
                                    </div>
                                ))
                                : <div/>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
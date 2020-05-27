import React from "react";
import {growConfigService} from '../_services/grow.config.service';
import InputRange from 'react-input-range';
import EdiText from "react-editext";
import TimePicker from 'react-time-picker';

import "./growConfigs.css";
import "react-input-range/lib/css/index.css";

export default class GrowConfigItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            left: 0,
            config: props.config,
            tempValue: {min: props.config.tempLow, max: props.config.tempHigh},
            humidityValue: {min: props.config.humidityLow, max: props.config.humidityHigh},
            currentLightOn: props.config.lightsOn,
            currentLightOff: props.config.lightsOff
        };

        this.handleTemperatureAndHumidityChange = this.handleTemperatureAndHumidityChange.bind(this);
        this.handleSaveConfigName = this.handleSaveConfigName.bind(this);
        this.updateConfiguration = this.updateConfiguration.bind(this);
        this.onChangeLightOn = this.onChangeLightOn.bind(this);
        this.onChangeLightOff = this.onChangeLightOff.bind(this);
        this.finalizeLightSchedule = this.finalizeLightSchedule.bind(this);
    }

    handleTemperatureAndHumidityChange(obj) {
        let configObj = this.state.config;

        if (obj.type === 'temperature') {
            this.setState({
                tempValue: obj.value
            });

            configObj.tempLow = obj.value.min;
            configObj.tempHigh = obj.value.max;
        } else {
            this.setState({
                humidityValue: obj.value
            });

            configObj.humidityLow = obj.value.min;
            configObj.humidityHigh = obj.value.max;
        }

        this.updateConfiguration(configObj);
    }

    handleSaveConfigName(value) {
        let configObj = this.state.config;
        configObj.name = value;

        this.updateConfiguration(configObj);
    }

    onChangeLightOn(value) {
        this.setState({
            currentLightOn: value
        });
    }

    onChangeLightOff(value) {
        this.setState({
            currentLightOff: value
        });
    }

    finalizeLightSchedule() {
        let configObj = this.state.config;
        configObj.lightsOn = this.state.currentLightOn;
        configObj.lightsOff = this.state.currentLightOff;

        this.updateConfiguration(configObj);
    }

    updateConfiguration(config) {
        growConfigService.updateById(config);
    }

    render() {
        return (
            <div className="col-sm-4 card">

                <div className="row">
                    <div className="col-12">
                        <EdiText
                            value={this.state.config.name}
                            type="text"
                            className="form-control-lg p-0"
                            submitOnEnter={true}
                            onSave={this.handleSaveConfigName}/>
                    </div>
                    <div className="col-12">
                        <div className="mb-4 mt-4 text-left">
                            Acceptable Temperature
                        </div>

                        <div className="">
                            <div className="">
                                <InputRange
                                    maxValue={90}
                                    minValue={50}
                                    value={this.state.tempValue}
                                    onChange={tempValue => this.setState({tempValue})}
                                    onChangeComplete={value => this.handleTemperatureAndHumidityChange({
                                        type: 'temperature',
                                        value: value
                                    })}/>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 mb-4">
                        <div className="mb-4 mt-4 text-left">
                            Acceptable Humidity
                        </div>

                        <div className="">
                            <div className="">
                                <InputRange
                                    maxValue={100}
                                    minValue={20}
                                    value={this.state.humidityValue}
                                    onChange={humidityValue => this.setState({humidityValue})}
                                    onChangeComplete={value => this.handleTemperatureAndHumidityChange({
                                        type: 'humidity',
                                        value: value
                                    })}/>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-12">
                            <label className="mr-2">Lights On: </label>

                            <div className="d-inline-block bg-white form-group ">
                                <TimePicker
                                    value={this.state.currentLightOn}
                                    onChange={this.onChangeLightOn}
                                    onClockClose={this.finalizeLightSchedule}/>
                            </div>
                        </div>
                        <div className="col-12">
                            <label className="mr-2">Lights Off: </label>
                            <div className="d-inline-block bg-white">
                                <TimePicker
                                    value={this.state.currentLightOff}
                                    onChange={this.onChangeLightOff}
                                    onClockClose={this.finalizeLightSchedule}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
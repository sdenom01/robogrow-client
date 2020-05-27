import React from "react";
import {growConfigService} from '../../_services/grow.config.service';

import InputRange from 'react-input-range';

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
        console.log("Update Config " + obj.type);
        console.log(obj.value);

        if (obj.type === 'temperature') {
            this.setState({
                tempValue: obj.value
            });
        } else {
            this.setState({
                humidityValue: obj.value
            });
        }

        growConfigService.updateById(this.state.config.id)
    }

    render() {
        return (
            <div style={{marginTop: "100px"}} className="container">
                <div className="row">
                <div className="col-12">
                    <div className="">
                        Acceptable Temperature
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <InputRange
                                maxValue={90}
                                minValue={50}
                                value={this.state.tempValue}
                                onChange={tempValue => this.setState({tempValue})}
                                onChangeComplete={value => this.updateConfiguration({type: 'temperature', value: value})}/>
                        </div>
                    </div>
                </div>
            </div>

                <div className="row mt-4">
                    <div className="col-12">
                        <div className="">
                            Acceptable Humidity
                        </div>

                        <div className="card">
                            <div className="card-body">
                                <InputRange
                                    maxValue={100}
                                    minValue={20}
                                    value={this.state.humidityValue}
                                    onChange={humidityValue => this.setState({humidityValue})}
                                    onChangeComplete={value => this.updateConfiguration({type: 'humidity', value: value})}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
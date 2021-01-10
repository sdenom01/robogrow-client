import React from "react";
import {growConfigService} from "../_services/grow.config.service";

export default class GrowListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            left: 0,
            grow: props.grow
        };
    }

    componentDidMount() {
        growConfigService.getById(this.state.grow.growConfigId).then(config => {
            let grow = this.state.grow;
            grow.config = config;

            this.setState({
                grow
            })
        });
    }

    getMinutes(str) {
        var time = str.split(':');
        return time[0] * 60 + time[1] * 1;
    }

    getMinutesNow() {
        var timeNow = new Date();
        return timeNow.getHours() * 60 + timeNow.getMinutes();
    }

    normalize(val, max, min) {
        return ((val - min) / (max - min)) * 100;
    }

    render() {
        if (this.state.grow.config) {
            var currentTempWidth = (this.state.grow && this.state.grow.current) ? this.normalize(this.state.grow.current.temp, this.state.grow.config.tempHigh, this.state.grow.config.tempLow) : -666;
            var currentHumidityWidth = (this.state.grow && this.state.grow.current) ? this.normalize(this.state.grow.current.humidity, this.state.grow.config.humidityHigh, this.state.grow.config.humidityLow) : -666;

            return (
                <div className="col-sm-8 col-md-8">
                    <a href={"/grows/" + this.state.grow._id}>
                        <div className="p-3 shadow">
                            <h5 className="text-center">{this.state.grow.name}</h5>

                            {(this.state.grow && this.state.grow.current)
                                ? <div className="row mb-4">
                                    <div className="col-12">
                                        <small>Temperature</small>
                                        <div className="progress mb-3">
                                            <div className="progress-bar bg-success text-light p-2"
                                                 style={{width: currentTempWidth + "%"}} role="progressbar"
                                                 aria-valuenow={this.state.grow.current.temp}
                                                 aria-valuemin={this.state.grow.config.tempLow}
                                                 aria-valuemax={this.state.grow.config.tempHigh}>
                                                {this.state.grow.current.temp}º
                                            </div>
                                        </div>

                                        <small>Humidity</small>
                                        <div className="progress mb-3">
                                            <div className="progress-bar bg-info text-light p-2"
                                                 style={{width: currentHumidityWidth + "%"}} role="progressbar"
                                                 aria-valuenow={this.state.grow.current.humidity}
                                                 aria-valuemin={this.state.grow.config.humidityHigh}
                                                 aria-valuemax={this.state.grow.config.humidityLow}>
                                                {this.state.grow.current.humidity}º
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : <div className="row mb-4">
                                    <div className="col-12">
                                        <div className="jumbotron text-center">
                                            <h2>
                                                Must sync Raspberry Pi
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </a>
                </div>
            );
        } else {
            return (
                <div className="col-sm-8 col-md-8">
                    <a href={"/grows/" + this.state.grow._id}>
                        <div className="p-3 shadow">
                            <h5 className="text-center">Unable to load configuration!</h5>
                        </div>
                    </a>
                </div>
            );
        }
    }
}
import React from "react";
import {growConfigService} from "../_services/grow.config.service";

export default class GrowListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            left: 0,
            grow: props.grow,
            isActive: props.isActive
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
            return (
                <div className="col-sm-12 col-md-12 m-1 grow-tab-row card">
                    <a href={"/grows/" + this.state.grow._id}>
                        <div className="row">
                            <div className="col-6 text-left">
                                <h5 className="mt-auto">{this.state.grow.name}</h5>
                            </div>
                            {
                                (this.state.grow && this.state.grow.current)
                                    ? <div className="col-6 row">
                                        <div className="col-3">
                                            <small className="text-secondary">Temperature</small>

                                            <div className="text-success">
                                                {this.state.grow.current.temp}°
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            <small className="text-secondary">Humidity</small>

                                            <div className="text-info">
                                                {this.state.grow.current.humidity}%
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            <small className="text-secondary">lux</small>

                                            <div className="text-warning">
                                                {this.state.grow.current.lux}
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            <small className="text-secondary">Infrared</small>

                                            <div className="text-danger">
                                                {this.state.grow.current.infrared}
                                            </div>
                                        </div>
                                    </div>
                                    : <div className="col-6">
                                        No current event
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
import React from "react";
import {growService} from '../_services/grow.service';
import "./growDetails.css";

import {Line} from 'react-chartjs-2';

export default class GrowDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grow: {},
            data: []
        };

        this.parseGraphData = this.parseGraphData.bind(this);
        this.currentTimeWithinRange = this.currentTimeWithinRange.bind(this);
        this.currentTempWithinRange = this.currentTempWithinRange.bind(this);
        this.currentHumidityWithinRange= this.currentHumidityWithinRange.bind(this);
    }

    componentDidMount() {
        const {growId} = this.props.match.params;

        growService.getById(growId).then(grow =>
            this.setState({
                grow: grow,
                data: this.parseGraphData(grow),
                currentEvent: grow.events[grow.events.length - 1]
            })
        )
    }

    parseGraphData(grow) {
        let labels = [];
        let dataTemp = [];
        let dataHumidity = [];

        grow.events.forEach((event) => {
            labels.push(event.createDate)
            dataTemp.push(event.temp)
            dataHumidity.push(event.humidity)
        });

        return ({
            labels: labels,
            datasets: [
                {
                    label: 'Temperature',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(221, 66, 66,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(221, 66, 66,1)',
                    pointBackgroundColor: 'rgba(221, 66, 66,1)',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgb(209, 0, 0, 1)',
                    pointHoverBorderColor: 'rgba(221, 66, 66,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: dataTemp
                }, {
                    label: 'Humidity',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(98, 119, 239, 1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(98, 119, 239, 1)',
                    pointBackgroundColor: 'rgba(98, 119, 239, 1)',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(85, 101, 193,1)',
                    pointHoverBorderColor: 'rgba(98, 119, 239, 1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: dataHumidity
                }
            ]
        })
    }

    currentTimeWithinRange() {
        var startTime = this.state.grow.config.lightsOn;
        var endTime = this.state.grow.config.lightsOff;
        var currentDate = new Date();

        var startDate = new Date(currentDate.getTime());
        startDate.setHours(startTime.split(":")[0]);
        startDate.setMinutes(startTime.split(":")[1]);
        startDate.setSeconds(startTime.split(":")[2]);

        var endDate = new Date(currentDate.getTime());
        endDate.setHours(endTime.split(":")[0]);
        endDate.setMinutes(endTime.split(":")[1]);
        endDate.setSeconds(endTime.split(":")[2]);

        var isValid = (startDate < currentDate && endDate > currentDate);
        return (isValid) ? 'ON' : 'OFF';
    }

    currentTempWithinRange() {
        var minTemp = this.state.grow.config.tempLow;
        var maxTemp = this.state.grow.config.tempHigh;
        // Get last one (most current)
        var currentTemp = this.state.currentEvent.temp;

        if (currentTemp < minTemp) {
            // COLD
            return ('COLD');
        } else if (currentTemp > maxTemp) {
            // HOT
            return ('HOT');
        } else {
            // OK
            return ('OK');
        }
    }

    currentHumidityWithinRange() {
        var minHumidity = this.state.grow.config.humidityLow;
        var maxHumidity = this.state.grow.config.humidityHigh;
        // Get last one (most current)
        var currentHumidity = this.state.currentEvent.humidity;

        if (currentHumidity < minHumidity) {
            // COLD
            return ('DRY');
        } else if (currentHumidity > maxHumidity) {
            // HOT
            return ('HUMID');
        } else {
            // OK
            return ('OK');
        }
    }

    render() {
        if (this.state.grow._id) {
            var isLightOn = this.currentTimeWithinRange();
            var temperatureStatus = this.currentTempWithinRange();
            var humidityStatus = this.currentHumidityWithinRange();

            return (
                <div className="mt-5">
                    <div className="container pt-4">
                        <div className="row">
                            <div className="ml-auto mr-auto row">
                                <h3 className="mt-auto mb-auto">{this.state.grow.name}</h3>
                                <div className="ml-4">
                                    <button className="btn btn-info p-2 mr-2"
                                            onClick={() => {
                                                window.location = "/grows/" + this.props.match.params.growId + "/edit"
                                            }}>
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="pt-3">
                            <div className="row">
                                <div className="col-10 ml-auto mr-auto">
                                    <Line
                                        data={this.state.data}
                                        width={100}
                                        height={300}
                                        options={{
                                            maintainAspectRatio: false,
                                            scales: {
                                                xAxes: [{
                                                    display: true,
                                                    gridLines: {
                                                        color: "#727272"
                                                    },
                                                    scaleLabel: {
                                                        display: true,
                                                        labelString: 'Month',
                                                        fontColor: 'white'
                                                    },
                                                    ticks: {
                                                        fontColor: "white", // this here
                                                    }
                                                }],
                                                yAxes: [{
                                                    display: true,
                                                    gridLines: {
                                                        color: "#727272"
                                                    },
                                                    scaleLabel: {
                                                        display: true,
                                                        labelString: 'Value',
                                                        fontColor: 'white'
                                                    },
                                                    ticks: {
                                                        fontColor: "white", // this here
                                                    }
                                                }]
                                            },
                                            legend: {
                                                labels: {
                                                    fontColor: 'white'
                                                }
                                            }
                                        }}/>
                                </div>
                                <div className="col-2 m-auto">
                                    <label></label>

                                    <div className="row mb-4">
                                        <div className="col-12">
                                            <div className="p-2 text-center">
                                                <h5>Temperature</h5>
                                                <h1 className="text-info">{this.state.currentEvent.temp}</h1>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="mt-4 p-2 text-center">
                                                <h5>Humidity</h5>
                                                <h1 className="text-info">{this.state.currentEvent.humidity}</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <label>Quick Look</label>

                                <div className="row mb-4">
                                    <div className="col-4">
                                        <div className="card shadow mr-2 p-2 text-center">
                                            <h5>Light Status</h5>
                                            <h5 style={(isLightOn === 'ON') ? {color: "green"} : {color: "red"}}>{isLightOn}</h5>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="card shadow mr-2 p-2 text-center">
                                            <h5>Temperature</h5>
                                            <h5 style={(temperatureStatus === 'COLD') ? {color: "cyan"} : (temperatureStatus === 'HOT') ? {color: "red"} : {color: "green"}}>{temperatureStatus}</h5>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="card shadow mr-2 p-2 text-center">
                                            <h5>Humidity</h5>
                                            <h5 style={(humidityStatus === 'DRY') ? {color: "red"} : (humidityStatus === 'HUMID') ? {color: "blue"} : {color: "green"}}>{humidityStatus}</h5>
                                        </div>
                                    </div>
                                </div>

                                <label>Configuration</label>

                                <div className="row">
                                    <div className="col-4">
                                        <div className="card shadow mr-2 p-2 text-center">
                                            <h5>Light Schedule</h5>
                                            <h5>{(this.state.grow && this.state.grow.config) ? (this.state.grow.config.lightsOn + ' - ' + this.state.grow.config.lightsOff) : 'N/A'}</h5>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="card shadow mr-2 p-2 text-center">
                                            <h5>Temperature Range</h5>
                                            <h5>{(this.state.grow && this.state.grow.config) ? (this.state.grow.config.tempLow + ' - ' + this.state.grow.config.tempHigh) : 'N/A'}</h5>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="card shadow mr-2 p-2 text-center">
                                            <h5>Humidity Range</h5>
                                            <h5>{(this.state.grow && this.state.grow.config) ? (this.state.grow.config.humidityLow + ' - ' + this.state.grow.config.humidityHigh) : 'N/A'}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (<div>Sorry! That grow cannot be found!</div>);
        }
    }
}
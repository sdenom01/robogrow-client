import React from "react";
import {growService} from '../_services/grow.service';
import "./growDetails.css";

import {Line} from 'react-chartjs-2';

import dateFormat from 'dateformat';

export default class GrowDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grow: {},
            primaryData: []
        };

        this.parsePrimaryGraphData = this.parsePrimaryGraphData.bind(this);
        this.currentTimeWithinRange = this.currentTimeWithinRange.bind(this);
        this.currentTempWithinRange = this.currentTempWithinRange.bind(this);
        this.currentHumidityWithinRange = this.currentHumidityWithinRange.bind(this);
    }

    componentDidMount() {
        const {growId} = this.props.match.params;

        growService.getById(growId).then(grow => {
                let labels = [];
                let dataTemp = [];
                let dataHumidity = [];
                let dataInfrared = [];
                let dataLux = [];

                grow.events.forEach((event) => {
                    labels.push(dateFormat(event.createDate, "h:MM:ss TT"));
                    dataTemp.push(event.temp);
                    dataHumidity.push(event.humidity);
                    dataInfrared.push(event.infrared);
                    dataLux.push(event.lux);
                });

                this.setState({
                    grow: grow,
                    primaryData: this.parsePrimaryGraphData(labels, dataTemp, dataHumidity),
                    secondaryData: this.parseSecondaryGraphData(labels, dataInfrared, dataLux),
                    currentEvent: grow.events[grow.events.length - 1]
                }, function () {
                    console.log("SET PRIMARY AND SECONDARY DATA");
                    console.log(this.state.primaryData);
                    console.log(this.state.secondaryData);
                })
            }
        )
    }

    parsePrimaryGraphData(labels, dataTemp, dataHumidity) {
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

    parseSecondaryGraphData(labels, dataInfrared, dataLux) {
        return ({
            labels: labels,
            datasets: [
                {
                    label: 'Infrared',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(255, 86, 86, 1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(255, 86, 86, 1)',
                    pointBackgroundColor: 'rgba(255, 86, 86, 1)',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(85, 101, 193,1)',
                    pointHoverBorderColor: 'rgba(255, 86, 86, 1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: dataInfrared
                }, {
                    label: 'Lux',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(255, 249, 86, 1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(255, 249, 86, 1)',
                    pointBackgroundColor: 'rgba(255, 249, 86, 1)',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(85, 101, 193,1)',
                    pointHoverBorderColor: 'rgba(255, 249, 86, 1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: dataLux
                }
            ]
        })
    }

    getMinutes(str) {
        var time = str.split(':');
        return time[0] * 60 + time[1] * 1;
    }

    getMinutesNow() {
        var timeNow = new Date();
        return timeNow.getHours() * 60 + timeNow.getMinutes();
    }

    currentTimeWithinRange() {
        if (this.state.grow && this.state.grow.config && this.state.grow.config.relaySchedules) {
            // TODO Make this dynamic!
            var startTime = this.state.grow.config.relaySchedules[0].events[0].triggerTime;
            var endTime = this.state.grow.config.relaySchedules[0].events[1].triggerTime;
            var currentDate = new Date();

            console.log(startTime, endTime, currentDate);
            var now = this.getMinutesNow();
            var start = this.getMinutes('10:00');
            var end = this.getMinutes('2:00');
            if (start > end) end += this.getMinutes('24:00');

            var isValid = (now > start) && (now < end);
            return (isValid) ? 'ON' : 'OFF';
        } else {
            return 'ERR';
        }
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

            let hrStyle = {
                border: 0,
                clear: "both",
                display: "block",
                width: "96%",
                height: "1px"
            };

            return (
                <div className="container">
                    <div className="jumbotron">
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
                                    <button className="btn p-2 mr-2"
                                            onClick={() => {
                                                window.location = "/grows/" + this.props.match.params.growId + "/timeline"
                                            }}>
                                        Timeline
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="pt-3">
                            <div className="row">
                                <div className="col-10 ">
                                    <div className="ml-auto mr-auto ">
                                        <Line
                                            data={this.state.primaryData}
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
                                                            labelString: 'Day',
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
                                    <div className="ml-auto mr-auto mt-4">
                                        <Line
                                            data={this.state.secondaryData}
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
                                                            labelString: 'Day',
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
                                </div>

                                <div className="col-2 m-auto">
                                    <div className="row mb-4">
                                        <div className="col-12 p-2">
                                            <div className="p-2 text-center">
                                                <h5>Temperature</h5>
                                                <h1 className="text-info">{this.state.currentEvent.temp}&#730;</h1>
                                            </div>
                                        </div>
                                        <div className="col-12 p-2">
                                            <div className="mt-4 p-2 text-center">
                                                <h5>Humidity</h5>
                                                <h1 className="text-info">{this.state.currentEvent.humidity}%</h1>
                                            </div>
                                        </div>

                                        <hr style={hrStyle}/>

                                        <div className="col-12 p-2">
                                            <div className="p-2 text-center">
                                                <h5>Infrared</h5>
                                                <h1 className="text-info">{this.state.currentEvent.infrared}</h1>
                                            </div>
                                        </div>
                                        <div className="col-12 p-2">
                                            <div className="mt-4 p-2 text-center">
                                                <h5>Lux</h5>
                                                <h1 className="text-info">{this.state.currentEvent.lux}</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 m-5">
                                <div className="col-8 m-auto">
                                    <div className="pb-2">Live Feed:</div>
                                <img className="" src="http://192.168.0.131:8081/"/>
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
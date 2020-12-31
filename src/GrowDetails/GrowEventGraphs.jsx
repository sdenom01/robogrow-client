import React from "react";
import {growService} from '../_services/grow.service';
import "./growDetails.css";

import {Line} from 'react-chartjs-2';

import dateFormat from 'dateformat';

export default class GrowEventGraphs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grow: {},
            primaryData: []
        };

        this.parsePrimaryGraphData = this.parsePrimaryGraphData.bind(this);
        this.currentTimeWithinRange = this.currentTimeWithinRange.bind(this);
    }

    componentDidMount() {
        console.log(this.props);
        const growId = this.props.growId;

        growService.getGrowEventsWithLimit(growId).then(events => {
                let labels = [];
                let dataTemp = [];
                let dataHumidity = [];
                let dataInfrared = [];
                let dataLux = [];

                events.forEach((event) => {
                    labels.push(dateFormat(event.createDate, "h:MM:ss TT"));
                    dataTemp.push(event.temp);
                    dataHumidity.push(event.humidity);
                    dataInfrared.push(event.infrared);
                    dataLux.push(event.lux);
                });

                this.setState({
                    events: events,
                    primaryData: this.parsePrimaryGraphData(labels, dataTemp, dataHumidity),
                    secondaryData: this.parseSecondaryGraphData(labels, dataInfrared, dataLux)
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
        // if (this.state.grow && this.state.grow.config && this.state.grow.config.relaySchedules) {
        //     // TODO Make this dynamic!
        //     var startTime = this.state.grow.config.relaySchedules[0].events[0].triggerTime;
        //     var endTime = this.state.grow.config.relaySchedules[0].events[1].triggerTime;
        //     var currentDate = new Date();
        //
        //     console.log(startTime, endTime, currentDate);
        //     var now = this.getMinutesNow();
        //     var start = this.getMinutes('10:00');
        //     var end = this.getMinutes('2:00');
        //     if (start > end) end += this.getMinutes('24:00');
        //
        //     var isValid = (now > start) && (now < end);
        //     return (isValid) ? 'ON' : 'OFF';
        // } else {
        //     return 'ERR';
        // }
    }


    render() {
        if (this.state.events) {
            return (
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
            );
        } else {
            return (<div/>);
        }
    }
}
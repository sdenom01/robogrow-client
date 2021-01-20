import React from "react";
import {growService} from '../_services/grow.service';
import "./growDetails.css";
import {Alert, Breadcrumb, Spinner} from 'react-bootstrap';

import {Line} from 'react-chartjs-2';

import dateFormat from 'dateformat';

export default class GrowDataGraphs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            growId: props.growId,
            isLoading: true,
            rangeIndex: 2,
            primaryData: []
        };

        this.parsePrimaryGraphData = this.parsePrimaryGraphData.bind(this);
    }

    componentDidMount() {
        this.fetchDataEventsWithLimit(144, this.state.rangeIndex);
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

    fetchDataEventsWithLimit(limit, index) {
        this.setState({
            isLoading: true
        });

        growService.getGrowDataEvents(this.state.growId, limit).then(events => {
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
                    primaryData: this.parsePrimaryGraphData(labels, dataTemp, dataHumidity),
                    secondaryData: this.parseSecondaryGraphData(labels, dataInfrared, dataLux),
                    currentEvent: events[events.length - 1],
                    isLoading: false,
                    rangeIndex: index
                })
            }
        )
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

    render() {
        if (!this.state.isLoading) {
            let hrStyle = {
                border: 0,
                clear: "both",
                display: "block",
                width: "96%",
                height: "1px"
            };

            // TODO: Serve this from the API, make this a date range .. not hard coded limits
            let rangeOptions = [
                {
                    display: "Lifetime",
                    limit: -1
                },
                {
                    display: "Month",
                    limit: 4320
                },
                {
                    display: "Day",
                    limit: 144
                }
            ];

            let self = this;
            return (
                <div className="pt-3">
                    <div className="row pl-5">
                        {
                            rangeOptions.map((option, index) => {
                                let clazz = (self.state.rangeIndex === index) ? "text-secondary" : "";

                                return (
                                    <Breadcrumb.Item className="mt-0" key={option.display} onClick={() => {
                                        this.fetchDataEventsWithLimit(option.limit, index)
                                    }}>
                                        <div className={clazz}>{option.display}</div>
                                    </Breadcrumb.Item>
                                )
                            })
                        }
                    </div>

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
                </div>
            );
        } else if (this.state.isLoading) {
            return (
                <div className="card w-25 mr-auto ml-auto mt-4">
                    Loading ...
                    <Spinner style={{width: "50px", height: "50px"}} animation="border" className="mr-auto ml-auto mt-3" variant="success" />
                </div>
            );
        } else {
            return (
                <div className="container mt-5">
                    <Alert className="w-25 ml-auto mr-auto text-center h5" variant="danger">
                        Sorry!
                        <hr/>
                        We're having a problem fetching the data events!
                    </Alert>
                </div>);
        }
    }
}
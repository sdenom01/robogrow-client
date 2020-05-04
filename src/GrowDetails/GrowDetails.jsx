import React from "react";
import {growService} from '../_services/grow.service';
import "./growDetails.css";
import Nav from "../Navigation/Nav";

import {Line} from 'react-chartjs-2';

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
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
            data: [65, 59, 80, 81, 56, 55, 40]
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
            data: [45, 39, 40, 41, 50, 67, 70]
        }
    ]
};

export default class GrowDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grow: {}
        }
    }

    componentDidMount() {
        const {growId} = this.props.match.params;

        growService.getById(growId).then(grow => this.setState({grow}))
    }

    render() {
        if (this.state.grow._id) {
            return (
                <div>
                    <Nav/>

                    <div className="container-fluid" style={{paddingTop: "100px"}}>
                        <div className="row">
                            <div className="ml-auto mr-auto row">
                                <h4 className="mt-auto mb-auto">{this.state.grow.name}</h4>
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

                        <div className="row">
                            <div className="col-10 ml-auto mr-auto">
                                <Line
                                    data={data}
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
                        </div>
                        <div className="container">
                            <label>Details</label>

                            <div className="row mb-4">
                                <div className="col-4">
                                    <div className="card shadow mr-2 p-2 text-center">
                                        <h5>Light Status</h5>
                                        <h5 style={{color: "green"}}>ON</h5>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="card shadow mr-2 p-2 text-center">
                                        <h5>Temperature</h5>
                                        <h5 style={{color: "red"}}>HOT</h5>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="card shadow mr-2 p-2 text-center">
                                        <h5>Humidity</h5>
                                        <h5 style={{color: "green"}}>OK</h5>
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
            );
        } else {
            return (<div>Sorry! That grow cannot be found!</div>);
        }
    }
}
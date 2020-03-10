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
        return (
            <div>
                <Nav/>

                <div className="container-fluid bg-3" style={{paddingTop: "100px"}}>
                    <div className="row">
                        <div className="ml-auto mr-auto">
                            <h4>{this.state.grow.name}</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 ml-auto mr-auto">
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
                </div>
            </div>
        );
    }
}
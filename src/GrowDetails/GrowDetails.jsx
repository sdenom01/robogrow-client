import React from "react";
import {growService} from '../_services/grow.service';
import GrowEventGraphs from "./GrowEventGraphs";
import "./growDetails.css";

export default class GrowDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grow: {},
            primaryData: []
        };
    }

    componentDidMount() {
        const {growId} = this.props.match.params;

        growService.getById(growId).then(grow => {
                this.setState({
                    grow: grow
                }, function () {
                    console.log("SET PRIMARY AND SECONDARY DATA");
                    console.log(this.state.primaryData);
                    console.log(this.state.secondaryData);
                })
            }
        )
    }

    getMinutes(str) {
        var time = str.split(':');
        return time[0] * 60 + time[1] * 1;
    }

    getMinutesNow() {
        var timeNow = new Date();
        return timeNow.getHours() * 60 + timeNow.getMinutes();
    }

    handleEndGrow() {
        growService.endGrowById(this.state.grow);
        window.location = "/grows";
    }

    render() {
        if (this.state.grow._id) {
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
                                    <button className="btn btn-danger p-2 mr-2"
                                            onClick={() => {
                                                this.handleEndGrow();
                                            }}>
                                        End Grow
                                    </button>
                                </div>
                            </div>
                        </div>

                        <GrowEventGraphs growId={this.state.grow._id}/>
                    </div>
                </div>
            );
        } else {
            return (<div>Sorry! That grow cannot be found!</div>);
        }
    }
}
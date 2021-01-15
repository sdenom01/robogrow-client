import React from "react";
import {growService} from '../_services/grow.service';
import GrowDataGraphs from "./GrowDataGraphs";
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

    toggleGrowStatus() {
        growService.toggleGrowById(this.state.grow).then(() => {
            window.location = "/grows";
        });
    }

    deleteGrow() {
        growService.deleteGrow(this.state.grow._id).then(() => {
            window.location = "/grows";
        });
    }

    render() {
        let btnRender = (this.state.grow.isActive)
            ? <button className="btn btn-danger p-2 mr-2"
                      onClick={() => {
                          this.toggleGrowStatus();
                      }}>
                End Grow
            </button>
            : <div>
                <button className="btn btn-success p-2 mr-2"
                        onClick={() => {
                            this.toggleGrowStatus();
                        }}>
                    Restart Grow
                </button>
                <button className="btn btn-danger p-2 mr-2"
                        onClick={() => {
                            this.toggleGrowStatus();
                        }}>
                    Delete Grow
                </button>
            </div>;

        if (this.state.grow._id) {
            return (
                <div className="container">
                    <div className="jumbotron">
                        <div className="row">
                            <div className="container-fluid">
                                <div className="row">
                                    <h3 className="col-6">{this.state.grow.name}</h3>
                                    <div className="ml-auto">
                                        <div className="row">
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

                                            {btnRender}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <GrowDataGraphs growId={this.state.grow._id}/>
                    </div>
                </div>
            );
        } else {
            return (<div>Sorry! That grow cannot be found!</div>);
        }
    }
}
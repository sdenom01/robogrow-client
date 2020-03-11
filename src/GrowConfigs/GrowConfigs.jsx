import React from "react";
import Carousel from "react-bootstrap/Carousel";
import {growService} from '../_services/grow.service';
import "./growConfigs.css";
import Nav from "../Navigation/Nav";

export default class GrowConfigs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            left: 0,
            grows: []
        };
    }

    componentDidMount() {
        growService.getAll().then(grows => this.setState({grows}))
    }

    render() {
        return (
            <div>
                <Nav/>

                <div className="container-fluid bg-3" style={{paddingTop: "100px"}}>
                    <div className="row">
                        {this.state.grows.map((grow) =>
                            (
                                <div className="col-sm-3">
                                    <a href={"/grows/" + grow._id}>
                                        <div className="card p-3 shadow">
                                            <h5 className="text-center">{grow.name}</h5>

                                            <small>Temperature</small>
                                            <div className="progress mb-3">
                                                <div className="progress-bar bg-success text-light" role="progressbar"
                                                     style={{width: "50%"}}
                                                     aria-valuenow="75" aria-valuemin="70" aria-valuemax="80">75º
                                                </div>
                                            </div>

                                            <small>Humidity</small>
                                            <div className="progress mb-3">
                                                <div className="progress-bar bg-info text-light" role="progressbar"
                                                     style={{width: "60%"}}
                                                     aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">60%
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
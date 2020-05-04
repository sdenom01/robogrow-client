import React from "react";
import {growConfigService} from '../_services/grow.config.service';
import "./growConfigs.css";
import Nav from "../Navigation/Nav";

export default class GrowConfigs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            left: 0,
            configs: []
        };
    }

    componentDidMount() {
        growConfigService.getAll().then(configs => this.setState({configs}))
    }

    render() {
        return (
            <div>
                <Nav/>

                <div className="container-fluid bg-3" style={{paddingTop: "100px"}}>
                    <div className="row">
                        {this.state.configs.map((config) => {
                                console.log(config);
                                return (
                                    <div className="col-sm-3">
                                        <a href={"/configs/" + config._id}>
                                            <div className="card p-3 shadow">
                                                <h5 className="text-center">{config.name}</h5>
                                            </div>
                                        </a>
                                    </div>
                                )
                            }
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
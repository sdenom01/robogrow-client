import React from "react";
import {growConfigService} from '../_services/grow.config.service';
import "./growConfigs.css";
import GrowConfigItem from "./GrowConfigItem";

export default class GrowConfigList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            left: 0,
            configs: []
        };

        this.createNewConfig = this.createNewConfig.bind(this);
    }

    componentDidMount() {
        growConfigService.getAll().then(configs => this.setState({configs}))
    }

    createNewConfig() {
        let defaultConfig = {
            name: "New Config"
        }

        growConfigService.create(defaultConfig).then(() => window.location = window.location);
    }

    render() {
        return (
            <div>
                <div className="container bg-3">
                    <div className="row">
                        <div className="col-4 m-auto text-center">
                            <a className=""  onClick={this.createNewConfig}>
                                <img className="" style={{width: "160px", height: "160px"}} src="./new_config.png"/>
                            </a>
                        </div>

                        {this.state.configs.map((config) => {
                                return (
                                    <GrowConfigItem key={config._id} config={config}/>
                                )
                            }
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
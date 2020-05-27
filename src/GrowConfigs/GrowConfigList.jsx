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
            name: "New Config",
            lightsOn: "07:15",
            lightsOff: "21:16",
            tempLow: 70,
            tempHigh: 78,
            humidityLow: 40,
            humidityHigh: 65
        }

        growConfigService.create(defaultConfig).then(() => window.location = window.location);
    }

    render() {
        return (
            <div>
                <div className="container bg-3" style={{paddingTop: "100px"}}>
                    <div className="row">
                        <div className="col-sm-4">
                            <a onClick={this.createNewConfig}>
                                <div className="card shadow p-3 text-center view overlay" style={{height: "360px"}}>
                                    <img className="m-auto" style={{width: "130px", height: "130px"}} src="./new_config.png"/>
                                </div>
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
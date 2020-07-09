import React from "react";
import {growConfigService} from '../_services/grow.config.service';
import "./growConfigs.css";
import GrowConfigItem from "./GrowConfigItem";
import GrowConfigItemNEW from "./GrowConfigItemNEW";

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
                <div className="container bg-3">
                    <div className="row">
                        <div className="col-4 m-auto text-center">
                            <a className=""  onClick={this.createNewConfig}>
                                <img className="" style={{width: "160px", height: "160px"}} src="./new_config.png"/>
                            </a>
                        </div>

                        {this.state.configs.map((config) => {
                                return (
                                    <GrowConfigItemNEW key={config._id} config={config}/>
                                )
                            }
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
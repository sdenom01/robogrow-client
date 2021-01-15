import React from "react";
import {growConfigService} from '../../_services/grow.config.service';

import ConfigRelayWrapper from "./ConfigRelayWrapper";

import "./growConfigDetails.css";
import "react-input-range/lib/css/index.css";
import EdiText from "react-editext";

export default class GrowConfigDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.updateConfigName = this.updateConfigName.bind(this);
        this.updateConfigRelays = this.updateConfigRelays.bind(this);
        this.updateConfiguration = this.updateConfiguration.bind(this);
    }

    componentDidMount() {
        const {configId} = this.props.match.params;

        growConfigService.getById(configId).then(config => {

            this.setState({
                config: config
            })
        })
    }

    updateConfiguration() {
        growConfigService.updateById(this.state.config);
    }

    updateConfigName(name) {
        this.state.config.name = name;
        this.updateConfiguration();
    }

    updateConfigRelays(schedules) {
        this.state.config.schedules = schedules;
        this.updateConfiguration();
    }

    render() {
        if (this.state.config) {
            return (
                <div className="container-fluid">
                    <div className="container">
                        <h4 className="text-white">
                            <EdiText
                                value={this.state.config.name}
                                type="text"
                                className="form-control-sm p-0"
                                submitOnEnter={true}
                                onSave={this.updateConfigName}/>
                        </h4>
                    </div>

                    <div className="m-4">
                        <h4 className="pb-4">
                            Relay Controls
                        </h4>

                        <ConfigRelayWrapper
                            schedules={this.state.config.relaySchedules}
                            updateConfigRelays={this.updateConfigRelays}/>
                    </div>
                </div>
            );
        } else {
            return <div/>;
        }
    }
}
import React from "react";
import {growConfigService} from '../_services/grow.config.service';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {
    faTrash,
} from '@fortawesome/free-solid-svg-icons'

import "./growConfigs.css";
import "react-input-range/lib/css/index.css";

export default class GrowConfigItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            config: props.config
        };

        this.confirmDeleteConfig = this.confirmDeleteConfig.bind(this);
    }

    confirmDeleteConfig() {
        if (window.confirm("Are you sure you want to delete config: " + this.state.config.name + "?")) {
            this.deleteConfig()
        }
    }

    deleteConfig() {
        growConfigService.deleteConfig(this.state.config._id);
    }

    render() {
        return (
            <div className="col-4">
                <div className="card">
                    <div className="row">
                        <div className="col-8 m-auto">
                            <a href={"/configs/" + this.state.config._id}>
                                {this.state.config.name}
                            </a>
                        </div>

                        <div className="col-4">
                            <div className="btn btn-danger" onClick={this.confirmDeleteConfig}>
                                <FontAwesomeIcon icon={faTrash} size="1x"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
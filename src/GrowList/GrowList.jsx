import React from "react";
import Carousel from "react-bootstrap/Carousel";
import {growService} from '../_services/grow.service';
import "./growList.css";
import GrowListItem from './GrowListItem';
import { growConfigService } from "../_services/grow.config.service";

export default class GrowList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            left: 0,
            grows: []
        };
    }

    componentDidMount() {
        //-- get all grows, then join them with their config
        growService.getAll()
            //.then(grows => grows.map(grow => growConfigService
            //    .getById(grow.growConfigId)
            //    .then(config => grow.config = config)))
            .then(grows => this.setState({grows}));
    }

    render() {
        return (
            <div>
                <div className="container bg-3" style={{paddingTop: "100px"}}>
                    <div className="row">
                        <div className="col-sm-4">
                            <a href={"/grows/new"}>
                                <div className="card shadow p-3 text-center view overlay">
                                    <img className="m-auto" style={{width: "160px", height: "160px"}} src="./new_grow.png"/>
                                </div>
                            </a>
                        </div>

                        {this.state.grows.map((grow) =>
                            (
                               <GrowListItem grow={grow}/>
                            )
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
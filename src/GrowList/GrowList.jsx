import React from "react";
import Carousel from "react-bootstrap/Carousel";
import {growService} from '../_services/grow.service';
import "./growList.css";
import GrowListItem from './GrowListItem';
import { growConfigService } from "../_services/grow.config.service";
import {Button, Modal} from "react-bootstrap";
import Editor from "../GrowTimeline/TimelineEditor";
import GrowEdit from "../GrowEdit/GrowEdit";

export default class GrowList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            left: 0,
            showModal: false,
            grows: []
        };

        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        //-- get all grows, then join them with their config
        growService.getAll()
            //.then(grows => grows.map(grow => growConfigService
            //    .getById(grow.growConfigId)
            //    .then(config => grow.config = config)))
            .then(grows => this.setState({grows}));
    }

    showModal() {
        this.setState({
            showModal: true
        })
    }

    closeModal() {
        this.setState({
            showModal: false
        });
    }

    render() {
        return (
            <div>
                <GrowEdit show={this.state.showModal} closeModal={this.closeModal} grow={{}}/>

                <div className="container bg-3" style={{paddingTop: "100px"}}>
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="btn-dark" onClick={this.showModal}>
                                <div className="card shadow p-3 text-center view overlay">
                                    <img className="m-auto" style={{width: "160px", height: "160px"}} src="./new_grow.png"/>
                                </div>
                            </div>
                        </div>

                        {this.state.grows.map((grow) =>
                            (
                               <GrowListItem grow={grow} closeModal={this.closeModal}/>
                            )
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
import React from "react";
import {growService} from '../_services/grow.service';
import "./growList.css";
import GrowListItem from './GrowListItem';
import {Tabs, Tab, Spinner, Button} from "react-bootstrap";

import GrowEdit from "../GrowEdit/GrowEdit";

export default class GrowListWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            left: 0,
            showModal: false,
            isLoading: true,
            activeGrows: [],
            inactiveGrows: []
        };

        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        //-- get all grows, then join them with their config
        growService.getAll(true)
            .then(activeGrows => {
                console.log("FIRST: " + JSON.stringify(activeGrows));
                growService.getAll(false)
                    .then(inactiveGrows => {
                        console.log("SECOND: " + JSON.stringify(inactiveGrows));
                        this.setState({
                            activeGrows,
                            inactiveGrows,
                            isLoading: false
                        })
                    })
            });
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
        if (this.state.isLoading) {
            return (
                <div className="card w-50 mr-auto ml-auto mt-4">
                    Loading ...
                    <Spinner style={{width: "50px", height: "50px"}} animation="border" className="mr-auto ml-auto mt-3" variant="success" />
                </div>
            );
        } else {
            return (
                <div>
                    <GrowEdit show={this.state.showModal} closeModal={this.closeModal} grow={{}}/>

                    <div className="container grow-tab-wrapper pl-3 pt-3 pr-3">
                        {/* TODO: Make conditional and only appear at the correct place */}
                        <Button variant="success" className="float-right btn-sm" onClick={this.showModal}>
                            Create New
                        </Button>

                        <Tabs defaultActiveKey="active" id="grow-tabs" className="text-dark">
                            <Tab eventKey="active" title="Active Grows">
                                <div className="row bg-dark p-3">
                                    {
                                        this.state.activeGrows.map((grow) =>
                                            (
                                                <GrowListItem grow={grow} closeModal={this.closeModal}/>
                                            )
                                        )
                                    }
                                </div>
                            </Tab>
                            <Tab eventKey="inactive" title="Inactive Grows">
                                <div className="row bg-dark p-3">
                                    {
                                        this.state.inactiveGrows.map((grow) =>
                                            (
                                                <GrowListItem grow={grow} closeModal={this.closeModal}/>
                                            )
                                        )
                                    }
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            );
        }
    }
}
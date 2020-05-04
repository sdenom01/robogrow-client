import React from "react";
import {growService} from '../_services/grow.service';
import "./growEdit.css";
import Nav from "../Navigation/Nav";

export default class GrowEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grow: {}
        }
    }

    componentDidMount() {
        const {growId} = this.props.match.params;

        if (growId) {
            growService.getById(growId).then(grow => this.setState({grow}))
        }
    }

    render() {
        return (
            <div>
                <Nav/>

                <div className="container-fluid" style={{paddingTop: "100px"}}>

                </div>
            </div>
        );
    }
}
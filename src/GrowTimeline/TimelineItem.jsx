import React from "react";

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./growTimeline.css";


import {Button} from 'react-bootstrap';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faTrash,
    faEdit
} from '@fortawesome/free-solid-svg-icons'

import dateFormat from 'dateformat';

import {TimelineItem} from 'vertical-timeline-component-for-react';

export default class GrowDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event: props.event
        };

        this.editEvent = this.editEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
    }

    componentDidMount() {

    }

    editEvent() {
        this.props.editEvent(this.state.event);
    }

    deleteEvent() {
        if (window.confirm("Are you sure you want to delete event: " + this.state.event.title + "?")) {
            this.props.deleteEvent(this.state.event)
        }
    }

    render() {
        return (
            <TimelineItem
                key="001"
                dateText={dateFormat(this.state.event.date, "mm/dd/yyyy h:MM:ss TT")}
                style={{color: '#333'}}
                dateStyle={{background: "none", boxShadow: '0.5rem 0.5rem 2rem 0 rgba(0, 0, 0, 0.2)'}}
                dateInnerStyle={{background: '#333', color: '#fff'}}
                bodyContainerStyle={{
                    background: '#333',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0.5rem 0.5rem 2rem 0 rgba(0, 0, 0, 0.2)',
                    color: "#fff"
                }}>

                <img src={this.state.event.imageUrl}
                     className="img-thumbnail"/>

                <h3>{this.state.event.title}</h3>

                <p dangerouslySetInnerHTML={{__html: this.state.event.text}}/>

                <div className="row mt-2 mr-1 ml-1">
                    <Button size="sm" variant="danger" onClick={this.deleteEvent}>
                        <FontAwesomeIcon className="" icon={faTrash} size="1x"/>
                    </Button>

                    <div className="col"/>

                    <Button size="sm" onClick={this.editEvent}>
                        <FontAwesomeIcon icon={faEdit} size="1x"/>
                    </Button>
                </div>
            </TimelineItem>
        );
    }
}
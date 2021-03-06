import React from "react";
import {growService} from '../_services/grow.service';

import {Modal, Button} from 'react-bootstrap';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faCalendarPlus,
} from '@fortawesome/free-solid-svg-icons'

import Editor from './TimelineEditor';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./growTimeline.css";

import {Timeline} from 'vertical-timeline-component-for-react';
import TimelineItem from './TimelineItem';


require('react-image-timeline/dist/timeline.css'); // .scss also available
// TODO: This WHOLE class should be reworked..
export default class GrowDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
            showModal: false,
            currentEvent: {}
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.updateCurrentEvent = this.updateCurrentEvent.bind(this);
        this.editEvent = this.editEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount() {
        const {growId} = this.props.match.params;

        growService.getTimelineEvents(growId).then(events => {
                this.setState({
                    events: events
                })
            }
        );
    }

    handleClose() {
        this.setState({
            currentEvent: {},
            showModal: false
        });
    }

    handleShow() {
        this.setState({
            showModal: true
        });
    }

    updateCurrentEvent(event) {
        this.setState({
            currentEvent: event
        });
    }

    editEvent(event) {
        this.setState({
            currentEvent: event
        }, this.handleShow);
    }

    deleteEvent() {
        if (window.confirm("Delete timeline event?")) {
            const {growId} = this.props.match.params;

            let foundEventIndex = -1;
            this.state.events.forEach((event, i) => {
                if (event._id === this.state.currentEvent._id) {
                    foundEventIndex = i;
                }
            });

            growService.deleteTimelineEvent(growId, this.state.currentEvent._id).then(event => {
                    var events = (foundEventIndex !== -1) ? this.state.events.splice(foundEventIndex, 1) : this.state.events;

                    this.setState({
                        events: events,
                        currentEvent: {},
                        showModal: false
                    });
                }
            );
        }
    }

    handleSave() {
        const {growId} = this.props.match.params;
        let eventObj = {
            _id: this.state.currentEvent._id,
            data: new Date(),
            growId: growId,
            title: this.state.currentEvent.title,
            text: this.state.currentEvent.text,
            imageUrl: this.state.currentEvent.imageUrl
        };

        if (!eventObj._id) {
            growService.createNewTimelineEvent(growId, eventObj).then(event => {
                    eventObj._id = event._id;
                
                    var events = this.state.events.concat(eventObj);
                    this.setState({
                        events: events,
                        showModal: false
                    });
                }
            );
        } else {
            let foundEventIndex = -1;
            this.state.events.forEach((event, i) => {
                if (event._id === this.state.currentEvent._id) {
                    foundEventIndex = i;
                }
            });

            growService.updateTimelineEvent(growId, eventObj).then(event => {
                    eventObj._id = event._id;

                    let events = this.state.events;
                    if (foundEventIndex !== -1) {
                        events[foundEventIndex] = eventObj;
                    }

                    this.setState({
                        events: events,
                        currentEvent: {},
                        showModal: false
                    });
                }
            );
        }
    }

    render() {
        let hasEvent = (this.state.currentEvent && this.state.currentEvent._id) ? true : false;

        let btnRender = (hasEvent)
            ? <Modal.Footer>
                <Button variant="danger" onClick={this.deleteEvent}>
                    Delete
                </Button>

                <Button variant="primary" onClick={this.handleSave}>
                    Update
                </Button>
            </Modal.Footer>
            : <Modal.Footer>
                <Button variant="primary" onClick={this.handleSave}>
                    Create
                </Button>
            </Modal.Footer>

        return (
            <div className="mt-5">
                <Modal show={this.state.showModal}
                       onHide={this.handleClose}
                       size="lg">
                    <Modal.Header>
                        <Modal.Title>New Timeline Event</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Editor event={this.state.currentEvent} updateCurrentEvent={this.updateCurrentEvent}/>
                    </Modal.Body>

                    {btnRender}
                </Modal>


                <div className="container p-0 text-center">
                    <div className="m-4">
                        <Button className="rounded-circle p-4 shadow" variant="success" onClick={this.handleShow}>
                            <FontAwesomeIcon icon={faCalendarPlus} size="3x"/>
                        </Button>
                    </div>

                    <Timeline lineColor={'#ddd'}>
                        {
                            this.state.events.map((event) => {
                                return (
                                    <TimelineItem event={event}
                                                  editEvent={this.editEvent}/>
                                );
                            })
                        }
                    </Timeline>
                </div>
            </div>
        );
    }
}
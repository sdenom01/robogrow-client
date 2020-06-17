import React from "react";
import {growService} from '../_services/grow.service';
import "./growTimeline.css";

// import Timeline from 'react-image-timeline';

import {Timeline, TimelineItem} from 'vertical-timeline-component-for-react';

import {Table} from 'react-bootstrap';


require('react-image-timeline/dist/timeline.css'); // .scss also available

const events = [
    {
        date: new Date(2020, 9, 27),
        text: "This started happening after I got careless with measuring nutrients right as we flipped over to flower.",
        title: "Fertalizer burn?",
        imageUrl: "https://bigbudsmag.com/wp-content/uploads/2013/04/bbm-07-13-2016-resized.jpg",
        buttonText: 'Edit',
        onClick: console.log()
    },
    {
        date: new Date(2020, 9, 31),
        text: "Really responding well to new nutrient schedule!",
        title: "Great Success!",
        imageUrl: "https://www.alchimiaweb.com/blog/wp-content/uploads/2009/12/sgrog_1.jpg",
        buttonText: 'Edit',
        onClick: console.log()
    },
    {
        date: new Date(2020, 10, 7),
        text: "Each one is really starting to fill out the screen now, they all look great! The best ones are #2, #3, and #6.",
        title: "Filling out!",
        imageUrl: "https://bigbudsmag.com/wp-content/uploads/2017/10/bbm-10-04-2017-resized.jpg",
        buttonText: 'Edit',
        onClick: console.log()
    }
];


export default class GrowDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grow: {},
            primaryData: []
        };
    }

    componentDidMount() {
        const {growId} = this.props.match.params;

        growService.getById(growId).then(grow => {
                this.setState({
                    grow: grow
                })
            }
        )
    }


    render() {
        return (
            <div className="mt-5">
                <div className="container p-0">
                    <Timeline lineColor={'#ddd'}>
                        <TimelineItem
                            key="001"
                            dateText="6/01/2020 06:00 PM"
                            style={{color: '#333'}}
                            dateStyle={{background: "none", boxShadow: '0.5rem 0.5rem 2rem 0 rgba(0, 0, 0, 0.2)'}}
                            dateInnerStyle={{background: '#333', color: '#fff'}}
                            bodyContainerStyle={{
                                background: '#333',
                                padding: '20px',
                                borderRadius: '8px',
                                boxShadow: '0.5rem 0.5rem 2rem 0 rgba(0, 0, 0, 0.2)',
                                color: "#fff"
                            }}
                        >
                            <h3>Fertilizer Burn?</h3>

                            <img src="https://bigbudsmag.com/wp-content/uploads/2013/04/bbm-07-13-2016-resized.jpg"
                                 className="img-thumbnail"/>

                            <p>
                                Est incididunt sint eu minim dolore mollit velit velit commodo ex nulla
                                exercitation. Veniam velit adipisicing anim excepteur nostrud magna
                                nostrud aliqua dolor. Sunt aute est duis ut nulla officia irure
                                reprehenderit laborum fugiat dolore in elit. Adipisicing do qui duis Lorem
                                est.
                            </p>
                        </TimelineItem>
                        <TimelineItem
                            key="001"
                            dateText="6/01/2020 06:45 PM"
                            style={{color: '#333'}}
                            dateStyle={{background: "none", boxShadow: '0.5rem 0.5rem 2rem 0 rgba(0, 0, 0, 0.2)'}}
                            dateInnerStyle={{background: '#333', color: '#fff'}}
                            bodyContainerStyle={{
                                background: '#333',
                                padding: '20px',
                                borderRadius: '8px',
                                boxShadow: '0.5rem 0.5rem 2rem 0 rgba(0, 0, 0, 0.2)',
                                color: "#fff"
                            }}
                        >
                            <h3>Deleafed</h3>

                            <p>
                                Est incididunt sint eu minim dolore mollit velit velit commodo ex nulla
                                exercitation. Veniam velit adipisicing anim excepteur nostrud magna
                                nostrud aliqua dolor. Sunt aute est duis ut nulla officia irure
                                reprehenderit laborum fugiat dolore in elit. Adipisicing do qui duis Lorem
                                est.
                            </p>
                        </TimelineItem>
                        <TimelineItem
                            key="002"
                            dateText="6/10/2020 1:42 AM"
                            style={{color: '#333'}}
                            dateStyle={{background: "none", boxShadow: '0.5rem 0.5rem 2rem 0 rgba(0, 0, 0, 0.2)'}}
                            dateInnerStyle={{background: '#333', color: '#fff'}}
                            bodyContainerStyle={{
                                background: '#333',
                                padding: '20px',
                                borderRadius: '8px',
                                boxShadow: '0.5rem 0.5rem 2rem 0 rgba(0, 0, 0, 0.2)',
                                color: "#fff"
                            }}
                        >
                            <h3>New nutrients, well recieved!</h3>
                            <p>
                                Seems like the nutrient burn has subsided and I decided to start back on a nutrient schedule.
                                Switched to Fox Farms Tigerbloom and it's being very well recieved, buds are noticeably danker
                                in just a matter of days!
                            </p>
                        </TimelineItem>
                    </Timeline>
                </div>
            </div>
        );
    }
}
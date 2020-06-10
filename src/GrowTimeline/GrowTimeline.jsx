import React from "react";
import {growService} from '../_services/grow.service';
import "./growTimeline.css";

import Timeline from 'react-image-timeline';

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
        // const {growId} = this.props.match.params;
        //
        // growService.getById(growId).then(grow => {
        //         let labels = [];
        //         let dataTemp = [];
        //         let dataHumidity = [];
        //         let dataInfrared = [];
        //         let dataLux = [];
        //
        //         grow.events.forEach((event) => {
        //             labels.push(dateFormat(event.createDate, "h:MM:ss TT"));
        //             dataTemp.push(event.temp);
        //             dataHumidity.push(event.humidity);
        //             dataInfrared.push(event.infrared);
        //             dataLux.push(event.lux);
        //         });
        //
        //         this.setState({
        //             grow: grow,
        //             primaryData: this.parsePrimaryGraphData(labels, dataTemp, dataHumidity),
        //             secondaryData: this.parseSecondaryGraphData(labels, dataInfrared, dataLux),
        //             currentEvent: grow.events[grow.events.length - 1]
        //         }, function () {
        //             console.log("SET PRIMARY AND SECONDARY DATA");
        //             console.log(this.state.primaryData);
        //             console.log(this.state.secondaryData);
        //         })
        //     }
        // )
    }


    render() {
        return (
            <div className="mt-5">
                <div className="container pt-4">
                    <Timeline events={events}/>
                </div>
            </div>
        );
    }
}
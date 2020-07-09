import React, {useState, useCallback} from 'react'
import {Card} from './Card'
import update from 'immutability-helper'

export const Container = (props) => {
    {
        const [cards, setCards] = useState([
            {
                id: 1,
                text: 'Write a cool JS library',
            },
            {
                id: 2,
                text: 'Make it generic enough',
            },
            {
                id: 3,
                text: 'Write README',
            },
            {
                id: 4,
                text: 'Create some examples',
            },
            {
                id: 5,
                text:
                    'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
            },
            {
                id: 6,
                text: '???',
            },
            {
                id: 7,
                text: 'PROFIT',
            },
        ]);

        const moveCard = useCallback(
            (dragIndex, hoverIndex) => {
                const dragCard = cards[dragIndex];

                setCards(
                    update(cards, {
                        $splice: [
                            [dragIndex, 1],
                            [hoverIndex, 0, dragCard],
                        ],
                    }),
                )
            },
            [cards],
        );

        const updateEvents = useCallback(
            (eventIndex, event) => {
                props.schedule.events[eventIndex] = event;
                props.updateRelaySchedules(props.schedule);
            }
        );

        const deleteEvent = useCallback(
            (eventIndex) => {
                props.schedule.events.splice(eventIndex, 1);
                props.updateRelaySchedules(props.schedule);
            }
        );

        const renderCard = (event, index) => {
            return (
                <Card
                    key={event.id}
                    index={index}
                    id={event.id}
                    event={event}
                    moveCard={moveCard}
                    updateEvent={updateEvents}
                    deleteEvent={deleteEvent}
                />
            )
        };

        return (
            <div className="p-4">
                <div className="text-white">
                    {props.schedule.name}
                </div>

                <div className="w-100">
                    {
                        props.schedule.events.map((event, i) => renderCard(event, i))
                    }
                </div>
            </div>
        )
    }
}

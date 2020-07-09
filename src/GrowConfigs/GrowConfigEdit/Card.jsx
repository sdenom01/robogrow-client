import React, {useRef} from 'react'
import {useDrag, useDrop} from 'react-dnd'
import {ItemTypes} from './ItemTypes'
import {Form} from 'react-bootstrap'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {
    faTrash,
} from '@fortawesome/free-solid-svg-icons'

import EdiText from "react-editext";

const style = {
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    cursor: 'move',
    width: "90%"
};

export const Card = ({id, event, index, moveCard, updateEvent, deleteEvent}) => {
    const ref = useRef(null);
    const [, drop] = useDrop({
        accept: ItemTypes.CARD,
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current ?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    });
    const [{isDragging}, drag] = useDrag({
        item: {type: ItemTypes.CARD, id, index},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    const changeStatus = function (e) {
        console.log(e);
        console.log(e.target.checked);
        event.status = (e.target.checked) ? 0: 1;
        updateRelayEvent(event);
    };

    const saveDescription = function (e) {
        event.Description = e;
        updateRelayEvent(event);
    };

    const saveTriggerTime = function (e) {
        event.triggerTime = e;
        updateRelayEvent(event);
    };

    const updateRelayEvent = function (event) {
        updateEvent(index, event);
    };

    const confirmDelete = function () {
        if (window.confirm("Are you sure you want to delete event: " + event.Description + "?")) {
            deleteEvent(index)
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="row m-2 p-3 bg-dark" ref={ref} style={{...style, opacity}}>
                    <Form.Check
                        className="col-2 mt-auto mb-auto"
                        type="switch"
                        id={index + "-" + event.id}
                        label=""
                        defaultChecked={(event.status == 0) ? true : false}
                        onChange={changeStatus}/>

                    <div className="col-5 mt-auto mb-auto">
                        <EdiText
                            value={event.Description}
                            type="text"
                            className="form-control-sm p-0"
                            submitOnEnter={true}
                            onSave={saveDescription}/>
                    </div>

                    <div className="col-4 mt-auto mb-auto">
                        <EdiText
                            value={event.triggerTime}
                            type="text"
                            className="form-control-sm p-0"
                            submitOnEnter={true}
                            onSave={saveTriggerTime}/>
                    </div>

                    <div className="col-1 mt-auto mb-auto">
                        <div className="btn btn-danger" onClick={confirmDelete}>
                            <FontAwesomeIcon icon={faTrash} size="1x"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

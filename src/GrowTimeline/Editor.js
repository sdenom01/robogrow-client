import React from 'react';
import {Form} from 'react-bootstrap';
import {EditorState, convertToRaw} from "draft-js";
import {Editor} from "react-draft-wysiwyg"
import draftToHtml from 'draftjs-to-html'

export default class EditorContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event: props.event,
            title: (props.event.title) ? props.event.title: "",
            imageUrl: (props.event.imageUrl) ? props.event.imageUrl: "",
            editorState: EditorState.createEmpty()
        };

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onImageUrlChange = this.onImageUrlChange.bind(this);
        this.onEditorStateChange = this.onEditorStateChange.bind(this);
    }

    onTitleChange(e) {
        this.setState({
            title: e.target.value
        }, this.updateCurrentEvent);
    }

    onImageUrlChange(e) {
        this.setState({
            imageUrl: e.target.value
        }, this.updateCurrentEvent);
    }

    updateCurrentEvent() {
        var event = {
            title: this.state.title,
            imageUrl: this.state.imageUrl,
            text: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
        };

        this.props.updateCurrentEvent(event);
    }

    onEditorStateChange(editorState) {
        this.setState({
            editorState,
        }, this.updateCurrentEvent);
    };

    render() {
        const {editorState} = this.state;
        return (
            <div className='container'>
                <Form>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={this.state.title} onChange={this.onTitleChange}/>

                    <Form.Label>Image Url</Form.Label>
                    <Form.Control type="text" value={this.state.imageUrl} onChange={this.onImageUrlChange}/>

                    <br/>

                    <Form.Label>Text</Form.Label>

                    <Editor
                        editorState={editorState}
                        onEditorStateChange={this.onEditorStateChange}
                        toolbar={{
                            inline: {inDropdown: true},
                            list: {inDropdown: true},
                            textAlign: {inDropdown: true}
                        }}
                    />
                </Form>
            </div>
        );
    }
}

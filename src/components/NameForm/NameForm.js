import React, {Component} from 'react';
import {Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

export default class NameForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputOne: '',
            textareaOne: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getValidationState() {
        const length = this.state.inputOne.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        $('#textareaOne').val(this.state.inputOne);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup
                        controlId="formBasicText"
                        validationState={this.getValidationState()}
                    >
                        <ControlLabel>Input text with validation</ControlLabel>
                        <FormControl
                            type="text"
                            name="inputOne"
                            value={this.state.inputOne}
                            placeholder="Enter text"
                            onChange={this.handleInputChange}
                        />
                        <FormControl.Feedback/>
                    </FormGroup>

                    <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>Textarea</ControlLabel>
                        <FormControl
                            componentClass="textarea"
                            name="textareaOne"
                            value={this.state.textareaOne}
                            placeholder="textarea"
                            onChange={this.handleInputChange}
                        />
                        <FormControl.Feedback/>
                    </FormGroup>

                    <Button type="submit" bsStyle="success">
                        Submit
                    </Button>
                </form>
            </div>
        )
    }
}


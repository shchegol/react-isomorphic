import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

export default class ToggleButton extends Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }))
    }

    render() {
        return (
            <Button bsStyle="primary" onClick={this.handleClick}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </Button>
        )
    }
}
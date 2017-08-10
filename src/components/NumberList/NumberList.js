import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

export default class NumberList extends Component {
    listItems() {
        return this.props.list
            .map((val, i) =>
                <ListGroupItem key={i}>
                    {val}
                </ListGroupItem>
            )
    }

    render() {
        return (
            <ListGroup>
                {this.listItems()}
            </ListGroup>
        )
    }
}


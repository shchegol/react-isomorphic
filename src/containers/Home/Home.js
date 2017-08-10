import React, {Component} from 'react';
import {render} from 'react-dom';
import {ToggleButton, Clock, NumberList, NameForm} from '../../components'
import {Grid, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

export default {

    start() {
        const location = document.getElementById('root');
        const someArray = ['Apple', 2, 3];

        class App extends Component {
            render() {
                return (
                    <Grid>
                        <Row>
                            <Col xs={12}>
                                <h3>The clock</h3>
                                <div>Now: <Clock /></div>
                            </Col>

                            <Col xs={12}>
                                <h3>Just button</h3>
                                <ToggleButton />
                            </Col>

                            <Col xs={12}>
                                <h3>List</h3>
                                <NumberList list={someArray} />
                            </Col>

                            <Col xs={12}>
                                <h3>Form</h3>
                                <NameForm />
                            </Col>
                        </Row>
                    </Grid>
                )
            }
        }

        render(
            <App/>,
            location
        );


    }
}

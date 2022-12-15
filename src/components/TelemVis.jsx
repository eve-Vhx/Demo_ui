// Node Dependencies
import React, {useEffect, useState} from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col  from 'react-bootstrap/Col';
import Container  from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Row  from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

import '../css/Telem.css';
import { gps_pos_tuple, state, armed } from './RosCon';



function TelemVis() {

    var [gps_data, updateData] = useState([30.391,-97.727,0])

    useEffect(() => {
        const interval = setInterval(() => {
          updateData(gps_data = gps_pos_tuple)
        }, 1000);
        return () => clearInterval(interval);
      }, []);

    return(
        <Container className='telemBox justify-content-center'>

                <Col className='m-4'>
                    <Row> 
                        <Col>Current State |</Col>
                        <Col>{ state }</Col>
                    </Row>
                    <Row> 
                        <Col>Arming |</Col>
                        <Col>{ armed }</Col>
                    </Row>
                    <Row> 
                        <Col>Velocity |</Col>
                        <Col>OFFLINE m/s</Col>
                    </Row>
                    <Row> 
                        <Col>Latitude |</Col>
                        <Col>{ gps_data[0] }</Col>
                    </Row>
                    <Row> 
                        <Col>Longitude |</Col>
                        <Col>{ gps_data[1] }</Col>
                    </Row>
                    <Row> 
                        <Col>Altitude |</Col>
                        <Col>{ gps_data[2] }</Col>
                    </Row>
                    <Row> 
                        <Col>Battery |</Col>
                        <Col>OFFLINE %</Col>
                    </Row>
                </Col>
        </Container>

    )
}

export default TelemVis;
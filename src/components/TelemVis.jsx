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
import { gps_pos_tuple } from './RosCon';



function TelemVis() {

    var [gps_data, updateData] = useState([30.391,-97.727,0])

    useEffect(() => {
        const interval = setInterval(() => {
          updateData(gps_data = gps_pos_tuple)
          console.log(gps_data)
        }, 1000);
        return () => clearInterval(interval);
      }, []);

    return(
        <Container className='telemBox justify-content-center'>
                <Col className='m-4'>
                    <Row> Current State | takeoff </Row>
                    <Row> Velocity | 4m/s </Row>
                    <Row> Latitude | { gps_data[0] } </Row>
                    <Row> Longitude | { gps_data[1] } </Row>
                    <Row> Altitude | 40m </Row>
                    <Row> Battery | 57% </Row>
                </Col>
        </Container>
    )
}

export default TelemVis;
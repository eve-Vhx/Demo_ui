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
import { gps_pos_tuple, state, armed, distance, velocity_x, velocity_z } from './RosCon';
import { nest_coord } from './GimbalVis';



function TelemVis(props) {

    var [gps_data, updateData] = useState([30.391,-97.727,0])

    useEffect(() => {
        const interval = setInterval(() => {
          updateData(gps_data = props.drone_obj.gps_position)
        }, 1000);
        return () => clearInterval(interval);
      }, []);

    return(
        <Container className='telemBox justify-content-center'>

                <Col className='m-4'>
                    <Row> 
                        <Col>Current State</Col>
                        <Col>{ props.drone_obj.state }</Col>
                    </Row>
                    <Row> 
                        <Col>Arming</Col>
                        <Col>{ props.drone_obj.armed }</Col>
                    </Row>
                    <Row> 
                        <Col>Forward Velocity</Col>
                        <Col>{ props.drone_obj.vel_x } m/s</Col>
                    </Row>
                    <Row> 
                        <Col>Vertical Velocity</Col>
                        <Col>{ props.drone_obj.vel_z } m/s</Col>
                    </Row>
                    <Row> 
                        <Col>Latitude</Col>
                        <Col>{ gps_data[0].toFixed(6) }</Col>
                    </Row>
                    <Row> 
                        <Col>Longitude</Col>
                        <Col>{ gps_data[1].toFixed(6) }</Col>
                    </Row>
                    <Row> 
                        <Col>Altitude</Col>
                        <Col>{ gps_data[2].toFixed(2) } m</Col>
                    </Row>
                    <Row> 
                        <Col>Ground Distance</Col>
                        <Col>{ props.drone_obj.distance_z } m</Col>
                    </Row>
                    <Row> 
                        <Col>Battery</Col>
                        <Col>{ props.drone_obj.battery }%</Col>
                    </Row>
                </Col>
        </Container>

    )
}

export default TelemVis;
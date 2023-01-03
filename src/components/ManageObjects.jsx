// package imports
import React, { useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Button from 'react-bootstrap/Button';
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Modal from 'react-bootstrap/Modal';
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Table from "react-bootstrap/Table";
import {service_client} from "./RosCon"

import {gps_pos_tuple} from './RosCon';

//Import modals
import MissionModal from "./modals/MissionModal";
import CreateDroneModal from "./modals/CreateDrone";

//Import objects
import {Drone} from "../models/drone";
import {Nest} from "../models/nest";

//Import ROS Topics
import { GPS_incoming } from "../ROSTopics/rosTopics";

//Declare objects arrays
export let drone_obj_array = []
export let nest_obj_array = []

//Global ROS Variables
export const ROSLIB = require('roslib');
export const ros = new ROSLIB.Ros();



function createDrone() {
    let drone_obj = new Drone(1,"QROW",30.391,-97.727,240,100);
    drone_obj_array.push(drone_obj);
}

function createNest() {
    let nest_obj = new Nest(1,30.391,-97.727,0);
    nest_obj_array.push(nest_obj);
}



function ManageObjects() {


    // Ros connection state changes
    const [badgecolor, setBadgecolor] = React.useState('');

    useEffect(() => {    
        ros.on('connection', () => {
        setBadgecolor('success');
        console.log('Connected to websocket server.');
        });
        ros.on('error', (error) => {
        setBadgecolor('warning');
        console.log(
            'Error connecting to network node:\nConnection status 0: ', 
            badgecolor, '\n\nError: ', error);
        });
        ros.on('close', () => {
        setBadgecolor('danger');
        console.log('Connection to websocket server closed.');
        });
    });
    /////////////////////////////////
    return (
        <>
            <Container>
                {/* Connection to ROS and ROS topics */}
                <Row className='pb-2 mt-0'>
                <h4>
                    <Badge bg= { badgecolor }>
                    Connection Status
                    </Badge>
                </h4>
                <div className='hr mb-3 mx-auto' style={{border: '1px solid white', maxWidth:'100%'}}/>
                </Row>
                <Row>
                    <Col>
                        <Button
                            variant="outline-success"
                            onClick={ () => { 
                                //ros.connect('ws://10.0.30.232:9090/');
                                ros.connect('ws://localhost:9090/');

                                let GPS_incoming_obj = new GPS_incoming()

                                createDrone();

                                GPS_incoming_obj.gps_listener2.subscribe( (message) => {
                                    if(drone_obj_array.length > 0) {
                                        drone_obj_array[0].gps_position = [message.latitude, message.longitude, message.altitude];
                                    }
                                });
                            }}>
                            eve Connect
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            variant="outline-danger">
                            eve Disconnect
                        </Button>
                    </Col>
                </Row>
            {/* End Connection to ROS and ROS topics */}

            {/* Start drone and nest management panel */}
                <Row className='mt-3'>
                    <h4>
                        <Badge bg= { badgecolor }>Drone and Nest Management</Badge>
                    </h4>
                    <div className='hr mb-3 mx-auto' style={{border: '1px solid white', maxWidth:'100%'}}/>
                </Row>

                <Row>
                    <Col>
                        <Row className="m-3">
                            {/* <Button variant="outline-success" onClick={createDrone}>+ Drone</Button> */}
                            <CreateDroneModal/>
                        </Row>
                        <Row className="m-3">
                            <Button variant="outline-danger">- Drone</Button>
                        </Row>
                    </Col>
                    <Col>
                        <Row className="m-3">
                            <Button variant="outline-success" onClick={createNest}>+ Nest</Button>
                        </Row>
                        <Row className="m-3">
                            <Button variant="outline-danger">- Nest</Button>
                        </Row>
                    </Col>
                </Row>
            {/* End drone and nest management panel */}

            {/* Start mission deployment panel */}
                <Row className='pb-2 pt-4'>
                    <h4>
                        <Badge bg= { badgecolor }>
                            Mission Deployment
                        </Badge>
                    </h4>
                    <div className='hr mb-3 mx-auto' style={{border: '1px solid white', maxWidth:'100%'}}/>
                </Row>

                <Row>
                    <MissionModal/>
                </Row>
            {/* End mission deployment panel */}

            {/* Start gimbal sliders */}
                
            </Container>
        </>
    );
}


export default ManageObjects;
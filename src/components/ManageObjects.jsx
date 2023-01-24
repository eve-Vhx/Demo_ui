// package imports
import React, { useEffect, useState } from "react";
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

//Import CSS
import "../css/MissionStatus.css";

//Import modals
import MissionModal from "./modals/MissionModal";
import CreateDroneModal from "./modals/CreateDrone";

//Import objects
import {Drone} from "../models/drone";
import {Nest} from "../models/nest";

//Import ROS Topics
import { ConnectionsDrone_incoming, GPS_incoming } from "../ROSTopics/rosTopics";
import { Connection_checks_incoming } from "../ROSTopics/rosTopics";
import { State_incoming } from "../ROSTopics/rosTopics";
import { Distance_incoming } from "../ROSTopics/rosTopics";
import { Velocity_incoming } from "../ROSTopics/rosTopics";
import { Battery_incoming } from "../ROSTopics/rosTopics";
import { Gimbal_outgoing } from "../ROSTopics/rosTopics";
import { Nest_gps_request_outgoing } from "../ROSTopics/rosTopics";

//Import drone mission details
import { drone1_mission_status } from "./modals/MissionModal";

//Declare objects arrays
export let drone_obj_array = []
export let nest_obj_array = []


//Global ROS Variables
export const ROSLIB = require('roslib');
export const ros = new ROSLIB.Ros();

export let connection_check_pi1 = false;
export let connection_check_px41 = false;
export let drone_gps_pos = [30.394, -97.723, 240];

//Drone 1 telemetry variables
export let drone1_state = "OFFLINE";
export let drone1_dist = "OFFLINE";
export let drone1_vel_x = "OFFLINE";
export let drone1_vel_y = "OFFLINE";
export let drone1_armed = "OFFLINE";


export let test_drone_obj = new Drone('001', 'QROW', 30.391, -97.727, 0, 100);
export let test_nest_obj = new Nest('001', 30.394, -97.723, 240);



function createDrone() {
    let drone_obj = new Drone(1,"QROW",30.391,-97.727,240,100);
    drone_obj_array.push(drone_obj);
}

function createNest() {
    let nest_obj = new Nest(1,30.391,-97.727,0);
    nest_obj_array.push(nest_obj);
}

function updateNests() {
    let nest_service_client_obj = new Nest_gps_request_outgoing()
    let nest_service_client = nest_service_client_obj.service_client;

    var request = new ROSLIB.ServiceRequest({
      
    });
    nest_service_client.callService(request, function(result) {
      console.log('Result for service call: ' + result.latitude + result.longitude + result.altitude);
      test_nest_obj.position = [result.latitude, result.longitude, result.altitude];
    });
}



function ManageObjects() {


    // Ros connection state changes
    const [badgecolor, setBadgecolor] = React.useState('');
    const [ConnectbadgecolorPi, setConnectbadgecolorPi] = React.useState('danger');
    const [ConnectbadgecolorPx4, setConnectbadgecolorPx4] = React.useState('danger');

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

    //Drone mission status updates
    var [drone1_mission_status_, updateDroneMissionStatus] = useState(" ");

    useEffect(() => {
        const interval = setInterval(() => {
            updateDroneMissionStatus("Testing case");
            if (drone1_mission_status === 0) updateDroneMissionStatus("Success");
            if (drone1_mission_status === 1) updateDroneMissionStatus("Error on the server. Another drone occupies destination");
            if (drone1_mission_status === 2) updateDroneMissionStatus("Error on the server. Px4 and Mavros not connected");
            if (drone1_mission_status === 3) updateDroneMissionStatus("Error on the server. Too long since last drone update");
        }, 500);
        return () => clearInterval(interval);
      }, []);

    let drone_printout_array = [];

    for (let i = 0; i < drone_obj_array.length; i++) {
        drone_printout_array.push(<li>Drone object vin: {drone_obj_array[i].id}</li>);
      }
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
                                ros.connect('ws://10.0.30.232:8080/');
                                //ros.connect('ws://localhost:8080/');

                                let GPS_incoming_obj = new GPS_incoming()
                                let State_incoming_obj = new State_incoming();
                                let Distance_incoming_obj = new Distance_incoming();
                                let Velocity_incoming_obj = new Velocity_incoming();
                                let battery_incoming_obj = new Battery_incoming();
                                let Gimbal_outgoing_obj = new Gimbal_outgoing();
                                let Connections_drone_obj = new ConnectionsDrone_incoming();

                                // test_drone_obj = new Drone('001', 'QROW', 30.391, -97.727, 0, 100);

                                GPS_incoming_obj.gps_listener1.subscribe( (message) => {
                                    // if(drone_obj_array.length > 0) {
                                    //     drone_obj_array[0].gps_position = [message.latitude, message.longitude, message.altitude];
                                    // }
                                    if(message.lat != NaN) {
                                        test_drone_obj.gps_position = [message.lat*(10**-7), message.lon*(10**-7), message.alt*(10**-3)]
                                    }
                                });

                                Connections_drone_obj.connections_listener.subscribe( (message) => {
                                    if (message.mavros === true){
                                        test_drone_obj.mavros_connect = "CONNECTED";
                                    } else if (message.mavros === false) {
                                        test_drone_obj.mavros_connect = "DISCONNECTED";
                                    }
                                    if (message.px4 === true){
                                        test_drone_obj.px4_connect = "CONNECTED"
                                    } else if (message.px4 === false){test_drone_obj.px4_connect = "DISCONNECTED"}
                                    if (message.wifi === true){
                                        test_drone_obj.wifi_connect = "CONNECTED"
                                    } else if (message.wifi === false) {test_drone_obj.wifi_connect = "DISCONNECTED"}
                                    if (message.lte === true){
                                        test_drone_obj.lte_connect = "CONNECTED"
                                    } else if (message.lte === false){test_drone_obj.lte_connect = "DISCONNECTED"}
    
                                });

                                State_incoming_obj.state_listener.subscribe( (message) => {
                                    test_drone_obj.state = message.mode;

                                    if (message.armed == false) {
                                        test_drone_obj.armed = "DISARMED";
                                      }
                                      else if (message.armed == true) {
                                        test_drone_obj.armed = "ARMED";
                                      }
                                      else {
                                        test_drone_obj.armed = "DISCONNECTED FROM VEHICLE"
                                      }
                                });

                                Distance_incoming_obj.distance_listener.subscribe( (message) => {
                                    test_drone_obj.distance_z = message.range.toFixed(1)
                                });

                                Velocity_incoming_obj.velocity_listener.subscribe( (message) => {
                                    test_drone_obj.vel_x = message.twist.linear.x;
                                    test_drone_obj.vel_z = message.twist.linear.z;
                                });

                                battery_incoming_obj.battery_listener.subscribe( (message) => {
                                    test_drone_obj.battery = message.percentage;
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
                <Row>
                    <Button variant="outline-primary" onClick={updateNests}>Update Nests</Button>
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

                <Row>

                    <p className="mission-status">{ drone1_mission_status_ }</p>
                </Row>
            {/* End mission deployment panel */}

            {/* Start gimbal sliders */}
        
                
            </Container>
        </>
    );
}


export default ManageObjects;
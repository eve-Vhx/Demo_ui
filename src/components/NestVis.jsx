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
import {charge_client} from "./RosCon"
import ButtonGroup from 'react-bootstrap/ButtonGroup';

//Import ROS Topics
import { Nest_charge_request_outgoing } from "../ROSTopics/rosTopics";

//Global ROS Variables
export const ROSLIB = require('roslib');
export const ros = new ROSLIB.Ros();

var charge_state = false;

function NestVis(){

    useEffect(() => {
        const interval = setInterval(() => {
        }, 500);
        return () => clearInterval(interval);
      }, []);

      function handleClose() {
        // modal_vis = false;
        // setShowVerify(false);
    }
    
    const submitCharge = (e) => {
        e.preventDefault()

        let charge_client_obj = new Nest_charge_request_outgoing();
        let charge_client = charge_client_obj.service_client;
    
        var request = new ROSLIB.ServiceRequest({
            charge_drone : !charge_state
        });
        charge_state = !charge_state;
        console.log("Charging drone request sent");
        console.log(request.charge_drone);
        charge_client.callService(request, function(result) {
            console.log('Result for service call: ' + result.completion);
        });
    }
    
  
    return(
        <>
        <Container className='justify-content-center'>
        <Col>
            <Button variant='secondary' onClick={submitCharge}>Charge</Button>
        </Col>
        </Container>
        </>
        );
}


export default NestVis;
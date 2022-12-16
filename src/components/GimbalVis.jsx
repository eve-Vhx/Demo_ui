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
import { gimbal_publisher, ROSLIB } from './RosCon';



function TelemVis() {

    var yaw_deg = 0;
    var pitch_deg = 0;
    var roll_deg = 0;

    function MoveGimbalLeft() {
      if(yaw_deg-5 > -180){
        yaw_deg = yaw_deg - 10;
      }

      var gimbal_msg = new ROSLIB.Message({
        yaw: yaw_deg,
        pitch: pitch_deg,
        roll: roll_deg
      });
      gimbal_publisher.publish(gimbal_msg);

    }

    function MoveGimbalRight() {
      if(yaw_deg+5 < 180){
        yaw_deg = yaw_deg + 10;
      }

      var gimbal_msg = new ROSLIB.Message({
        yaw: yaw_deg,
        pitch: pitch_deg,
        roll: roll_deg
      });
      gimbal_publisher.publish(gimbal_msg);

    }

    function MoveGimbalUp() {
      if(pitch_deg+5 < 25){
        pitch_deg = pitch_deg + 10;
      }

      var gimbal_msg = new ROSLIB.Message({
        yaw: yaw_deg,
        pitch: pitch_deg,
        roll: roll_deg
      });
      gimbal_publisher.publish(gimbal_msg);

    }

    function MoveGimbalDown() {
      if(pitch_deg-5 > -25){
        pitch_deg = pitch_deg - 10;
      }

      var gimbal_msg = new ROSLIB.Message({
        yaw: yaw_deg,
        pitch: pitch_deg,
        roll: roll_deg
      });
      gimbal_publisher.publish(gimbal_msg);

    }

    return(
      <>
      <Col>
        <ButtonGroup>
          <Button variant='secondary' onClick={MoveGimbalLeft}>Left</Button>
          <Button variant='secondary' onClick={MoveGimbalRight}>Right</Button>
        </ButtonGroup>
      </Col>
      <Col>
        <ButtonGroup>
          <Button variant='secondary' onClick={MoveGimbalUp}>Up</Button>
          <Button variant='secondary' onClick={MoveGimbalDown}>Down</Button>
        </ButtonGroup>
      </Col>
      </>
    )
}

export default TelemVis;
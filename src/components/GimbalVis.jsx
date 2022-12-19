// Node Dependencies
import React, {useEffect, useState} from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col  from 'react-bootstrap/Col';
import Container  from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
// import RangeSlider from 'react-bootstrap/RangeSlider';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Row  from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import '../css/Telem.css';
import { gimbal_publisher, ROSLIB } from './RosCon';
import RangeSlider from 'react-bootstrap-range-slider';


function TelemVis() {

    var yaw_deg = 0;
    var pitch_deg = 0;
    var roll_deg = 0;
    var ctrl_mode = 2;

    const [ value1, setValue1 ] = useState(0);
    const [ value2, setValue2 ] = useState(0);
    
    function UpdateYaw(event){
      setValue1(event.target.value);
      yaw_deg = event.target.value;
      var gimbal_msg = new ROSLIB.Message({
        yaw: Number(yaw_deg),
        pitch: pitch_deg,
        roll: roll_deg,
        mode: ctrl_mode
      });
      console.log(gimbal_msg);
      gimbal_publisher.publish(gimbal_msg);
    }
    function UpdatePitch(event){
      setValue2(event.target.value);
      pitch_deg = event.target.value;
      var gimbal_msg = new ROSLIB.Message({
        yaw: yaw_deg,
        pitch: Number(pitch_deg),
        roll: roll_deg,
        mode: ctrl_mode
      });
      gimbal_publisher.publish(gimbal_msg);
    }
    return(
      <>
      <Col>
      Yaw
      <RangeSlider
            name="Yaw"
            value={value1}
            min={-180}
            max={180}
            onChange={UpdateYaw} 
    />
      </Col>
      <Col>
      Pitch
      <RangeSlider
            value={value2}
            min={-30}
            max={30}
            onChange={UpdatePitch}
          />
      </Col>
      </>
    )
}

export default TelemVis;
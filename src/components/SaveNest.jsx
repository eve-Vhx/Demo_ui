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
import RangeSlider from 'react-bootstrap-range-slider';

import '../css/Telem.css';
import { gimbal_publisher, ROSLIB, gps_pos_tuple } from './RosCon';

export var nest_coord = [30.387734, -97.728561, 0];

function TelemVis() {

  function SaveNest() {
    nest_coord = gps_pos_tuple;
  }

  return(
    <>
    <Container className='justify-content-center'>
    <Row className='m-4'>
      <Button variant='primary' onClick={SaveNest}>Save Nest</Button>
    </Row>
    </Container>
    </>
  )
}

export default TelemVis;

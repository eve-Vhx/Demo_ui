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
import { test_drone_obj, test_nest_obj } from './ManageObjects';



function TelemVis(props) {

    var [gps_data, updateGPSData] = useState([30.391,-97.727,0]);
    var [state_data, updateStateData] = useState("OFFLINE");
    var [armed_data, updateArmedData] = useState("OFFLINE");
    var [battery_data, updateBatteryData] = useState("OFFLINE");
    var [distz_data, updateDistzData] = useState("OFFLINE");
    var [velx_data, updateVelxData] = useState("OFFLINE");
    var [velz_data, updateVelzData] = useState("OFFLINE");
    var [mavros_connect_data, updateMavrosData] = useState("OFFLINE");
    var [px4_connect_data, updatePx4Data] = useState("OFFLINE");
    var [wifi_connect_data, updateWifiData] = useState("OFFLINE");
    var [lte_connect_data, updateLteData] = useState("OFFLINE");

    useEffect(() => {
        const interval = setInterval(() => {
        //   updateData(gps_data = props.drone_obj.gps_position)
        updateGPSData(gps_data = test_drone_obj.gps_position);
        updateStateData(state_data = test_drone_obj.state);
        updateArmedData(armed_data = test_drone_obj.armed);
        updateBatteryData(battery_data = test_drone_obj.battery);
        updateDistzData(distz_data = test_drone_obj.distance_z);
        updateVelxData(velx_data = test_drone_obj.vel_x);
        updateVelzData(velz_data = test_drone_obj.vel_z);

        updateMavrosData(mavros_connect_data = test_drone_obj.mavros_connect);
        updatePx4Data(px4_connect_data = test_drone_obj.px4_connect);
        updateWifiData(wifi_connect_data = test_drone_obj.wifi_connect);
        updateLteData(lte_connect_data = test_drone_obj.lte_connect);
        // updatePx4Data(if(test_drone_obj.px4_connect === true) {
        //     px4_connect_data = "CONNECTED"
        // } else {px4_connect_data = "DISCONNECTED"});
        // updateWifiData(if(test_drone_obj.wifi_connect === true) {
        //     wifi_connect_data = "CONNECTED"
        // } else {wifi_connect_data = "DISCONNECTED"});
        // updateLteData(if(test_drone_obj.lte_connect === true) {
        //     lte_connect_data = "CONNECTED"
        // } else {lte_connect_data = "DISCONNECTED"});
        // console.log(test_drone_obj);
        }, 1000);
        return () => clearInterval(interval);
      }, []);

    return(
        <Container className='telemBox justify-content-center'>

                <Col className='m-4'>
                    <Row> 
                        <Col>Current State</Col>
                        <Col>{ state_data }</Col>
                    </Row>
                    <Row> 
                        <Col>Arming</Col>
                        <Col>{ armed_data }</Col>
                    </Row>
                    <Row> 
                        <Col>Forward Velocity</Col>
                        <Col>{ velx_data } m/s</Col>
                    </Row>
                    <Row> 
                        <Col>Vertical Velocity</Col>
                        <Col>{ velz_data } m/s</Col>
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
                        <Col>{ distz_data } m</Col>
                    </Row>
                    <Row> 
                        <Col>Battery</Col>
                        <Col>{ battery_data }%</Col>
                    </Row>
                    <Row> 
                        <Col>LTE Connect</Col>
                        <Col>{ lte_connect_data }</Col>
                    </Row>
                    <Row> 
                        <Col>WIFI Connect</Col>
                        <Col>{ wifi_connect_data }</Col>
                    </Row>
                    <Row> 
                        <Col>MAVROS</Col>
                        <Col>{ mavros_connect_data }</Col>
                    </Row>
                    <Row> 
                        <Col>PX4</Col>
                        <Col>{ px4_connect_data }</Col>
                    </Row>
                </Col>
        </Container>

    )
}

export default TelemVis;
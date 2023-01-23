import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import InnerErrorBound from '../utilities/err/InnerErrorBound';
import OuterErrorBound from '../utilities/err/OuterErrorBound';

import ROSCon from '../components/RosCon';
import MapVis from '../components/MapVis';
import TelemVis from '../components/TelemVis';
import GimbalVis from '../components/GimbalVis';
import NestControl from '../components/ManageObjects';
import NestVis from '../components/NestVis';
import Logo from '../images/Logo-01.png';
import '../css/Header.css';
import {Drone} from '../models/drone';
import {Nest} from '../models/nest';
import ManageObjects from '../components/ManageObjects';
import { drone_gps_pos } from '../components/ManageObjects';
import { test_drone_obj } from '../components/ManageObjects';

const MissionContext = React.createContext();

export var nest_obj = new Nest(1,30.381,-97.737,0);

function Single() {
    
    let drone_obj = new Drone(1,"QROW",30.391,-97.727,240,100);

    function dropNest() {
        nest_obj.position = test_drone_obj.gps_position;
    }
    return (
    <>
        <OuterErrorBound>
            <Container className='justify-content-center'>
                {/* Logo at top pf page */}
                <Row className='justify-content-center'>
                    <img src={ Logo } alt="" style={{ width: "400px", margin: "1rem" }}/>
                </Row>
                {/* Finish Logo */}
                <Row className='justify-content-center'>
                    <Col>

                        {/* Map Visual eleement called here */}
                        <MissionContext.Provider>
                            <MapVis drone_obj = {drone_obj}/>
                        </MissionContext.Provider>
                        {/* Finish map visual element */}

                    </Col>
                    <Col className='px-5' md={ 4 }>
                        <Row>
                            <h2>Control</h2>
                            <InnerErrorBound>
                                {/* <ROSCon drone_obj = {drone_obj}/> */}
                                <ManageObjects/>
                            </InnerErrorBound>
                        </Row>
                        <Row className='py-4'>
                            <h2>Mission Telemetry</h2>
                            <TelemVis drone_obj = {drone_obj}/>
                        </Row>
                        <Row className='py-4'>
                            {/* <ManageObjects/> */}
                            <h2>Nest Control</h2>
                            <NestVis drone_obj = {drone_obj}/>
                            <Button variant='outline-secondary' onClick={dropNest}>
                                Drop Nest
                            </Button>
                        </Row>      
                        {/* <Row className='py-4'>
                            <h2>Gimbal Control</h2>
                            <GimbalVis/>
                        </Row> */}
                    </Col>
                </Row>
            </Container>
        </OuterErrorBound>
    </>
    );
}

export default Single;
export { MissionContext };
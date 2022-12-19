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
import NestControl from '../components/NestControl';

import Logo from '../images/Logo-01.png';
import '../css/Header.css';
import {Drone} from '../models/drone';
import {Nest} from '../models/nest';

const MissionContext = React.createContext();

export var nest_obj = new Nest(1,30.381,-97.737,0);

function Single() {
    
    let drone_obj = new Drone(1,"QROW",30.391,-97.727,0,100);

    function dropNest() {
        nest_obj.position = drone_obj.gps_position;
    }

    return (
    <>
        <OuterErrorBound>
            <Container className='justify-content-center'>
                <Row className='justify-content-center'>
                    <img src={ Logo } alt="" style={{ width: "400px", margin: "1rem" }}/>
                </Row>
                <Row className='justify-content-center'>
                    <Col>

                {/* Map Visual eleement called here */}
                        <MissionContext.Provider>
                            <MapVis drone_obj = {drone_obj}/>
                        </MissionContext.Provider>
                    </Col>
                    <Col className='px-5' md={ 4 }>
                        <Row>
                            <h2>Control</h2>
                            <InnerErrorBound>
                                <ROSCon drone_obj = {drone_obj}/>
                            </InnerErrorBound>
                        </Row>
                        <Row className='py-4'>
                            <h2>Mission Telemetry</h2>
                            <TelemVis drone_obj = {drone_obj}/>
                        </Row>
                        <Row className='py-4'>
                            <h2>Nest Control</h2>
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
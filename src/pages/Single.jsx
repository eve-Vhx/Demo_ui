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

function Single() {
    
    let drone_obj = new Drone(1,"QROW",30.391,-97.727,0,100);
    let nest_init = new Nest(0,0,0,0);
    let nest_array = [];
    nest_array.push(nest_init);

    function dropNest() {
        let nest_obj = new Nest(nest_array.length + 1,drone_obj.latitude,drone_obj.longitude,drone_obj.altitude);
        nest_array.push(nest_obj);
        console.log("Number of nests: " + nest_array.length);
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
                            <MapVis drone_obj = {drone_obj} nest_array = {nest_array}/>
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
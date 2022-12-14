import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import InnerErrorBound from '../utilities/err/InnerErrorBound';
import OuterErrorBound from '../utilities/err/OuterErrorBound';

import ROSCon from '../components/RosCon';
import MapVis from '../components/MapVis';
import TelemVis from '../components/TelemVis';

import Logo from '../images/Logo-01.png';
import '../css/Header.css';

const MissionContext = React.createContext();

function Single() {


    return (
    <>
        <OuterErrorBound>
            <Container className='justify-content-center'>
                <Row className='justify-content-center'>
                    <img src={ Logo } alt="" className='logo'/>
                </Row>
                <Row>
                    <Col className='' >

                {/* Map Visual eleement called here */}
                        <MissionContext.Provider>
                            <MapVis/>
                        </MissionContext.Provider>
                    </Col>
                    <Col className='px-5' md={ 4 }>
                        <Row>
                            <h2>Control</h2>
                            <InnerErrorBound>
                                <ROSCon/>
                            </InnerErrorBound>
                        </Row>
                        <Row className='py-4'>
                            <h2>Mission Telemetry</h2>
                            <TelemVis/>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </OuterErrorBound>
    </>
    );
}

export default Single;
export { MissionContext };
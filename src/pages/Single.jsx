import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import InnerErrorBound from '../utilities/err/InnerErrorBound';
import OuterErrorBound from '../utilities/err/OuterErrorBound';

import ROSCon from '../components/RosCon';
import MapVis from '../components/MapVis';

const MissionContext = React.createContext();

function Single() {

    return (
    <>
        <OuterErrorBound>
            <Container className='justify-content-center'>
                <Row>
                    <Col className='' >

                {/* Map Visual eleement called here */}
                        <MissionContext.Provider>
                            <MapVis/>
                        </MissionContext.Provider>
                    </Col>
                    <Col className='' md={ 4 }>
                        <h2>Control</h2>
                        <InnerErrorBound>
                            <ROSCon/>
                        </InnerErrorBound>
                    </Col>
                </Row>
            </Container>
        </OuterErrorBound>
    </>
    );
}

export default Single;
export { MissionContext };
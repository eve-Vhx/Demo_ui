// Node Dependencies
import React, {useEffect} from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col  from 'react-bootstrap/Col';
import Container  from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Row  from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// Local Dependencies
import MissionModal from './modals/MissionModal';
import '../css/RosCon.css';
export var gps_pos_tuple = [0,0,0];
export var service_client = null;

function ROSCon() {
    const ROSLIB = require('roslib');
    const ros = new ROSLIB.Ros();
    var connection_status = false;
    let gps_listener = null;

      // Mounted state changes
    const [badgecolor, setBadgecolor] = React.useState('');

    useEffect(() => {    
        ros.on('connection', () => {
        setBadgecolor('success');
        console.log('Connected to websocket server.');
        });
        ros.on('error', (error) => {
        setBadgecolor('warning');
        console.log(
            'Error connecting to network node:\nConnection status 0: ', 
            badgecolor, '\n\nError: ', error);
        });
        ros.on('close', () => {
        setBadgecolor('danger');
        console.log('Connection to websocket server closed.');
        });
    });

  return(
    <>
        <Container className='justify-content-center' style={{}}>
            <Row className='pb-2 mt-0'>
              <h4>
                <Badge bg= { badgecolor }>
                  Connection Status
                </Badge>
              </h4>
              <div className='hr mb-3 mx-auto' style={{border: '1px solid white', maxWidth:'100%'}}/>
            </Row>
            <Row>
                <Col>
                    <Button
                        variant="outline-success"
                        onClick={ () => { if(connection_status == false) {
                            ros.connect('ws://localhost:9090/');
                            gps_listener = new ROSLIB.Topic({
                              ros: ros,
                              name: '/drone1_gps',
                              messageType: 'sensor_msgs/NavSatFix'
                            }).subscribe( (message) => {
                                if (message.latitude == NaN) {
                                    gps_pos_tuple = [30.391, -97.727, 240]
                                }
                                else {
                                    gps_pos_tuple = [message.latitude, message.longitude, message.altitude];
                                }
                              
                            
                              });
                              service_client = new ROSLIB.Service({
                                ros : ros,
                                name : '/ui_mission_req',
                                serviceType : 'msg_pkg/UiReq'
                              });
                              connection_status = true;
                            }
                        }}>
                        eve Connect
                    </Button>
                </Col>
                <Col>
                    <Button
                        variant="outline-danger">
                        eve Disconnect
                    </Button>
                </Col>
            </Row>
            <Row className='pb-2 pt-4'>
                <h4>
                    <Badge bg= { badgecolor }>
                        Mission Deployment
                    </Badge>
                </h4>
                <div className='hr mb-3 mx-auto' style={{border: '1px solid white', maxWidth:'100%'}}/>
            </Row>

            <Row>
                <MissionModal/>
            </Row>

        </Container>
    </>     
  )
}

export default ROSCon;
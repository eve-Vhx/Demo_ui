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
export var gps_pos_tuple = [30.391,-97.727,0];
export var state = "OFFLINE";
export var armed = false;
export var battery = 100;
export var distance = 0;
export var velocity_x = 0;
export var velocity_z = 0;
export var service_client = null;
export var charge_client = null;
export var gimbal_publisher = null;
export const ROSLIB = require('roslib');

function ROSCon(props) {
    const ros = new ROSLIB.Ros();
    var connection_status = false;
    let gps_listener = null;
    let state_listener = null;
    let battery_listener = null;
    let distance_listener = null;
    let compass_listener = null;
    let velocity_listener = null;

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
                            ros.connect('ws://10.0.30.232:9090/');
                            gps_listener = new ROSLIB.Topic({
                              ros: ros,
                              name: '/mavros/gpsstatus/gps1/raw',
                              messageType: 'mavros_msgs/GPSRAW'
                            }).subscribe( (message) => {
                              
                                props.drone_obj.gps_position = [message.lat*(10**-7), message.lon*(10**-7), message.alt*(10**-3)];
          
                              
                              });
                            state_listener = new ROSLIB.Topic({
                              ros: ros,
                              name: '/mavros/state',
                              messageType: 'mavros_msgs/State'
                            }).subscribe( (message) => {
                              
                                props.drone_obj.state = message.mode;
                                if (message.armed == false) {
                                  props.drone_obj.armed = "DISARMED";
                                }
                                else if (message.armed == true) {
                                  props.drone_obj.armed = "ARMED";
                                }
                                else {
                                  props.drone_obj.armed = "DISCONNECTED FROM VEHICLE"
                                }
                              
                              });

                              distance_listener = new ROSLIB.Topic({
                                ros: ros,
                                name: '/mavros/distance_sensor/hrlv_ez4_pub',
                                messageType: 'sensor_msgs/Range'
                              }).subscribe( (message) => {
                                
                                  props.drone_obj.distance_z = message.range.toFixed(1);
                                
                              });

                              
                              compass_listener = new ROSLIB.Topic({
                                ros: ros,
                                name: '/mavros/global_position/compass_hdg',
                                messageType: 'std_msgs/Float64'
                              }).subscribe( (message) => {
                                
                                  //heading_deg = message.;
                                
                              });

                              velocity_listener = new ROSLIB.Topic({
                                ros: ros,
                                name: '/mavros/setpoint_velocity/cmd_vel',
                                messageType: 'geometry_msgs/TwistStamped'
                              }).subscribe( (message) => {
                                
                                  props.drone_obj.vel_x = message.twist.linear.x;
                                  props.drone_obj.vel_z = message.twist.linear.z;
                                
                              }); 

                              gimbal_publisher = new ROSLIB.Topic({
                                ros : ros,
                                name : "/mavros/mount_control/command",
                                messageType : 'mavros_msgs/MountControl'
                              });
                            

                              service_client = new ROSLIB.Service({
                                ros : ros,
                                name : '/ui_mission_req',
                                serviceType : 'msg_pkg/UiReq'
                              });
                              connection_status = true;


                              charge_client = new ROSLIB.Service({
                                ros : ros,
                                name : '/nest_charge_req',
                                serviceType : 'msg_pkg/chrgDrone'
                              });
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
                <MissionModal gps_pos_tuple={ gps_pos_tuple }/>
            </Row>

        </Container>
    </>     
  )
}

export default ROSCon;
// package imports
import React from "react";
import Alert from "react-bootstrap/Alert";
import Button from 'react-bootstrap/Button';
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Modal from 'react-bootstrap/Modal';
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import ros from "../RosCon";
import ROSLIB from "roslib";
import {service_client} from "../RosCon";
import { Mission_request_outgoing } from "../../ROSTopics/rosTopics";


const initialMissionData = Object.freeze({
    latitude: 0,
    longitude: 0,
    altitude: 0,
    drone_id: 0
});


function DeploymentModal(props) {

  var nest_gps_pos = [0,0,0];

  // state
  const [show, setShow] = React.useState(false);
  const [mission_data, setMish] = React.useState(initialMissionData);

  // handlers
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const updateMission = (e) => {
    setMish({
        ...mission_data,

        [e.target.name]: e.target.value.trim()
    });
  }

  const submitMission = (e) => {
    e.preventDefault()

    let service_client_obj = new Mission_request_outgoing()
    let service_client = service_client_obj.service_client;

    var request = new ROSLIB.ServiceRequest({
      lat : parseFloat(mission_data.latitude),
      lon : parseFloat(mission_data.longitude),
      alt : parseFloat(mission_data.altitude)
    });
    service_client.callService(request, function(result) {
      console.log('Result for service call: ' + result.completion);
    });

    handleClose();
  }


  return(
    <>
      <Row className="p-2">
        <Button variant="outline-primary" size="lg" onClick={ handleShow }>
          Deploy Mission
        </Button>
      </Row>


{/* --------------MODAL START-------------- */}
      <Modal show={ show } onHide={ handleClose }>
        <Modal.Header closeButton>
          <Modal.Title>
            New Mission
          </Modal.Title>
        </Modal.Header>

{/* --------------FORM START-------------- */}
        <Modal.Body>
          <Form>
                
{/* -------------- Mission Target selection -------------- */}
{/* follow ESRI formatting  */}
{/* (latitude-y, longitude-x) */}
            <Row className='inp-space'>
                <Form.Group controlId='trgt-position'>
                    <Form.Label>
                        Specify Coordinates
                    </Form.Label>
                    <Row>
                        <Col className="m-3">
                            <input placeholder="Latitude" name="latitude" onChange={updateMission}/>
                        </Col>
                        <Col className="m-3">
                            <input placeholder="Longitude" name="longitude" onChange={updateMission} />
                        </Col>
                        <Col className="m-3">
                            <input placeholder="Altitude (m)" name="altitude" onChange={updateMission} />
                        </Col>
                        <Col className="m-3">
                            <input placeholder="Drone #" name="drone_id" onChange={updateMission} />
                        </Col>
                    </Row>
                </Form.Group>
            </Row>
        </Form>
        </Modal.Body>
        {/* --------------FORM END-------------- */}

        <Modal.Footer>
            <Button variant="secondary" onClick={ handleClose }>
                Close
            </Button>
            <Button variant="primary" onClick={ submitMission }>
                Deploy
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeploymentModal;
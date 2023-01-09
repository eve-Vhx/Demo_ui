// package imports
import React from "react";
import Alert from "react-bootstrap/Alert";
import Button from 'react-bootstrap/Button';
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Modal from 'react-bootstrap/Modal';
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import ros from "../RosCon";
import ROSLIB from "roslib";
import {service_client} from "../RosCon";


//Import drone object array
import {drone_obj_array} from "../ManageObjects";

//Import drone object
import {Drone} from "../../models/drone";




function CreateDroneModal() {

    function handleSubmit() {
        var drone_match = 0;
        for (let i = 0; i < drone_obj_array.length; i++) {
            if (drone_obj_array[i].id == newDrone_vin) {
                drone_match++;
                drone_obj_array[i].gps_position = [newDrone_lat, newDrone_lon, newDrone_alt]
            }
        }
        if (drone_match == 0){ 
            let new_drone_obj = new Drone(newDrone_vin, newDrone_type, Number(newDrone_lat), Number(newDrone_lon), Number(newDrone_alt), 100);
            drone_obj_array.push(new_drone_obj);
        }
        for (var i = 0; i < drone_obj_array.length; i++) {
            console.log(drone_obj_array[i].id);
        }
        handleClose()
    }

    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // State functions for form data
    const [newDrone_lat, SetnewDrone_lat] = React.useState(0);
    const [newDrone_lon, SetnewDrone_lon] = React.useState(0);
    const [newDrone_alt, SetnewDrone_alt] = React.useState(0);
    const [newDrone_type, SetnewDrone_type] = React.useState("QROW");
    const [newDrone_vin, SetnewDrone_vin] = React.useState("001");

    const latChangeHandler = (event) => {
        SetnewDrone_lat(event.target.value);
      };

    const lonChangeHandler = (event) => {
        SetnewDrone_lon(event.target.value);
    };

    const altChangeHandler = (event) => {
        SetnewDrone_alt(event.target.value);
      };

    const typeChangeHandler = (event) => {
        SetnewDrone_type(event.target.value);
    };

    const vinChangeHandler = (event) => {
        SetnewDrone_vin(event.target.value);
      };


  return(
    <>
        {/* Start Create Drone Button */}
        <Row>
            <Button variant="outline-success" size="md" onClick={ handleShow }>
                + Drone
            </Button>
        </Row>
        {/* End Create Drone Button */}

        {/* Start Modal */}

        <Modal show={ show } onHide={ handleClose }>
            <Modal.Header closeButton>
                <Modal.Title>
                    Create New Drone
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Col>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-default">
                            Latitude
                            </InputGroup.Text>
                            <Form.Control
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            type="number"
                            value={newDrone_lat}
                            onChange={latChangeHandler}
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-default">
                            Longitude
                            </InputGroup.Text>
                            <Form.Control
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            type="number"
                            value={newDrone_lon}
                            onChange={lonChangeHandler}
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-default">
                            Altitude
                            </InputGroup.Text>
                            <Form.Control
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            type="number"
                            value={newDrone_alt}
                            onChange={altChangeHandler}
                            />
                        </InputGroup>
                        <FloatingLabel 
                            controlId='floatingSelect' 
                            label='Vehicle Type' 
                            style={{ color:'blue', fontSize:'1rem' }}
                            className="mb-3">
                            <Form.Select aria-label='Select Vehicle Type' value={newDrone_type} onChange={typeChangeHandler}>
                                <option value="QROW">QROW</option>

                            </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel 
                            controlId='floatingSelect' 
                            label='VIN' 
                            style={{ color:'blue', fontSize:'1rem' }}
                            className="mb-3">
                            <Form.Select aria-label='Select VIN' value={newDrone_vin} onChange={vinChangeHandler}>
                                <option value="001">001</option>
                                <option value="002">002</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Button variant="primary" onClick={handleSubmit}>
                        Initialize Drone
                    </Button>
                </Form>
            </Modal.Body>

        </Modal>

    </>
  );
}

export default CreateDroneModal;
import React from "react";
import Map, { Layer, Marker, Popup, useMap } from "react-map-gl";
import maplibregl from "maplibre-gl";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

// imports:
import "maplibre-gl/dist/maplibre-gl.css";
import drone_image from "../images/QROW_UI_new.png";
import nest_image from "../images/eve_nest.png";
import { gps_pos_tuple } from './RosCon';
import { useEffect, useState } from "react";
import { nest_obj } from "../pages/Single";
import VerifyModal from "./modals/VerifyModal";
import ROSLIB from 'roslib';
import {service_client} from './RosCon';
import { drone_obj_array } from "./ManageObjects";
import { drone_gps_pos } from "./ManageObjects";
import { Mission_request_outgoing } from "../ROSTopics/rosTopics";
import { test_drone_obj, test_nest_obj } from "./ManageObjects";
import '../css/NestData.css';

export var modal_vis = false;

// Initial data for state objects

const initialAlt = Object.freeze({
    alt_add: 0
});

const initialDroneData = [30.394, -97.723, 0]
const initialNestData = [30.392, -97.728, 0]

//////////////////////////////////


function MapVis(props) {

    var [test_drone_gps, updateDroneDataTest] = useState(initialDroneData);
    var [drone_data_1, updateDroneData] = useState(initialDroneData);
    var [drone_data_2, updateDroneData] = useState(initialDroneData);
    var [nest_data, updateNestData] = useState(initialNestData)
    const [showPopup, setShowPopup] = React.useState(false);
    const [showVerify, setShowVerify] = React.useState(false);
    const [flight_alt, setFlightAlt] = React.useState(initialAlt);

    const updateFlightAltitude = (e) => {
        setFlightAlt({
            ...flight_alt,
    
            [e.target.name]: e.target.value.trim()
        });
      }


    useEffect(() => {
        const interval = setInterval(() => {
          //updateDroneData(drone_data = props.drone_obj.gps_position);
          //updateDroneData(drone_data_1 = drone_obj_array[0].gps_position);
          //updateDroneData(drone_data_2 = drone_obj_array[1].gps_position);
          updateDroneDataTest(test_drone_gps = test_drone_obj.gps_position);
          //console.log(drone_obj_array[0].gps_position)
          updateNestData(nest_data = nest_obj.position)
        }, 500);
        return () => clearInterval(interval);
      }, []);

      function handleClose() {
        modal_vis = false;
        setShowVerify(false);
    }
  
    const submitMission = (e) => {
        e.preventDefault()

        let service_client_obj = new Mission_request_outgoing();
        let service_client = service_client_obj.service_client;
    
        var request = new ROSLIB.ServiceRequest({
          lat : parseFloat(nest_obj.position[0]),
          lon : parseFloat(nest_obj.position[1]),
          alt : parseFloat(nest_obj.position[2] + Number(flight_alt.alt_add))
        });
        console.log(request.alt);
        service_client.callService(request, function(result) {
          console.log('Result for service call: ' + result.completion);
        });
    
        handleClose();
      }

    


    return (
        <>
        <Map
            mapLib={maplibregl}
            initialViewState={{
                latitude: 30.391,
                longitude: -97.727,
                zoom: 14,
            }}  
            style={{
                border: "2.5% solid #0d6efd",
                borderRadius: "5%",
                width: "100%",
                height: "85vh",
            }}
            mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        >
            
            <Marker 
                latitude={ test_drone_gps[0] }
                longitude={ test_drone_gps[1] }
                anchor="center"
                color="blue"
                style={{ cursor: "pointer" }}
                rotation="0"
            >
                <img src={ drone_image } alt="" width="68px" height="60px"/>
            </Marker>

            <Marker 
                latitude={nest_data[0]}
                longitude={nest_data[1]}
                anchore="center"
                style={{ cursor: "pointer" }}
                rotation="0"
                onClick={(e) => {
                    e.originalEvent.stopPropagation();
                    setShowPopup(!showPopup);
                  }}
            >
                <img src={ nest_image } alt="" width="60px"/>
            </Marker>
                
            {showPopup && (
                <Popup latitude={nest_data[0]} longitude={nest_data[1]} closeButton={0}>
                  {/* <Container className="nestData p-2">
                    <Col>
                      <Row className="p-1">
                          <h4>Nest 1 Status</h4>
                      </Row>
                      <Row className="p-1">
                          <Col>Connected</Col>
                      </Row>
                      <Row className="p-1">
                          <Col>Unoccupied</Col>
                      </Row>
                    </Col>
                    </Container> */}
                    <Button className="p-3" variant="success" onClick={(e) => {
                         setShowVerify(true);
                         modal_vis = true;
                    }}>Deploy To Nest</Button>
                </Popup>
            )}
            


        </Map>

        <VerifyModal show_modal = {showVerify}/>

        {/* --------------MODAL START-------------- */}
      <Modal show={ showVerify } onHide={ handleClose }>
        <Modal.Header closeButton>
          <Modal.Title>
            Mission Verification
          </Modal.Title>
        </Modal.Header>

{/* --------------FORM START-------------- */}
        <Modal.Body>
            <Form>
              <Form.Label>
              <h4 className="text-danger">[Warning] You are about to deploy an active drone. Are you sure you wish to continue?</h4>
              </Form.Label>
                <input placeholder="Specify Flight Altitude" name="alt_add" onChange={updateFlightAltitude}/>
                <Col className="m-4">
                  <Row className="p-2">Destination Lat: {nest_obj.position[0]}</Row>
                  <Row className="p-2">Destination Lon: {nest_obj.position[1]}</Row>
                  <Row className="p-2">Destination Alt: {(nest_obj.position[2] + Number(flight_alt.alt_add))}</Row>
                </Col>
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

    )

}
  
export default MapVis;
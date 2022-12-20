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




function VerifyModal(props) {

    var show = props.show_modal;


//   // handlers
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
    function handleClose() {
        show = false;
        console.log(show);
    }
  
    const submitMission = (e) => {
        e.preventDefault()
    
    
        var request = new ROSLIB.ServiceRequest({
          lat : parseFloat(props.latitude),
          lon : parseFloat(props.longitude),
          alt : parseFloat(props.altitude)
        });
        service_client.callService(request, function(result) {
          console.log('Result for service call: ' + result.completion);
        });
    
        handleClose();
      }



  console.log(props.show_modal);


  return(
    <>

{/* --------------MODAL START-------------- */}
      <Modal show={ show } onHide={ handleClose }>
        <Modal.Header closeButton>
          <Modal.Title>
            Mission Verification
          </Modal.Title>
        </Modal.Header>

{/* --------------FORM START-------------- */}
        <Modal.Body>
            <h4 className="text-danger">[Warning] You are about to deploy an active drone. Are you sure you wish to continue?</h4>
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

export default VerifyModal;
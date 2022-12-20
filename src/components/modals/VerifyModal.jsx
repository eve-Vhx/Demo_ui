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
import {nest_obj} from '../../pages/Single';
import {modal_vis} from '../MapVis';




function VerifyModal(props) {

    // var show = props.show_modal;

    const [show, setShow] = React.useState(props.show_modal);
    const [add_alt, setAlt] = React.useState(0);

    const updateAlt = (e) => {
      setAlt({
          ...add_alt,
  
      });
    }



//   // handlers
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
    function handleClose() {
        setShow(false);
        modal_vis = false;
    }
  
    const submitMission = (e) => {
        e.preventDefault()
    
    
        var request = new ROSLIB.ServiceRequest({
          lat : parseFloat(nest_obj.position[0]),
          lon : parseFloat(nest_obj.position[1]),
          alt : parseFloat(nest_obj.position[2] + add_alt)
        });
        service_client.callService(request, function(result) {
          console.log('Result for service call: ' + result.completion);
        });
    
        handleClose();
      }




  return(
    <>

{/* --------------MODAL START-------------- */}
      <Modal show={ modal_vis } onHide={ handleClose }>
        <Modal.Header closeButton>
          <Modal.Title>
            Mission Verification
          </Modal.Title>
        </Modal.Header>

{/* --------------FORM START-------------- */}
        <Modal.Body>
            <h4 className="text-danger">[Warning] You are about to deploy an active drone. Are you sure you wish to continue?</h4>
            <input placeholder="Desired Altitude (m)" name="add_alt" onChange={updateAlt} />
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
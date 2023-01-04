import { ROSLIB } from "../components/ManageObjects";
import { ros } from "../components/ManageObjects";

export class GPS_incoming {
    constructor() {
        this.gps_listener1 = new ROSLIB.Topic({
            ros: ros,
            name: '/mavros/gpsstatus/gps1/raw',
            messageType: 'mavros_msgs/GPSRAW'
        })
        this.gps_listener2 = new ROSLIB.Topic({
            ros: ros,
            name: '/drone1_gps',
            messageType: 'sensor_msgs/NavSatFix'
        })
    }
}

export class Connection_checks_incoming {
    constructor() {
        this.checkups_listener1 = new ROSLIB.Topic({
            ros: ros,
            name: '/connection_checkups',
            messageType: 'msg_pkg/ui_checkups_msg'
        })
    }
}

export class Mission_request_outgoing {
    constructor() {
        this.service_client = new ROSLIB.Service({
            ros : ros,
            name : '/ui_mission_req',
            serviceType : 'msg_pkg/UiReq'
        });
    }
}
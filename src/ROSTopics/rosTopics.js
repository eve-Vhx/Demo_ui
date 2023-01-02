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
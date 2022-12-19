//////////////////////////////////////////////////////////////////////////////
//  This is the general data model for drones as they appear on the WEBSITE.
//    This is not the same as how they will appear in the database.
//    To see the schema of the database, check eQS-Lite. 
//
//      For now, we only need to know the location of the drones,
//          what kind of drone they are, their battery status,
//          and their network/flight status.
// 
//////////////////////////////////////////////////////////////////////////////
export class Drone {
    constructor(vin, dtype, latitude, longitude, altitude, battery) {
        this.id = vin;
        this.dtype = dtype;
        this.gps_position = [latitude, longitude, altitude];
        this.battery = battery;
        this.state = "OFFLINE";
        this.armed = false;
        this.distance_z = 0;
        this.vel_x = 0;
        this.vel_z = 0;       
//                                  [ online? , network? , mission?, flight ]
//                                  example:    [1, 1, 0, 0]
        this.docked = null;
        this.perched = null;
        this.ipAddr = null;

    }
}

//lat
//lon
//alt
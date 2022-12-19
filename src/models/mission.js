import { v4 as uuidv4 } from 'uuid';

export class Mission {
    constructor(operator, org = 'eve', target = [], fleet = [], description = '') {
        this.uuid = uuidv4();
        this.operator = operator;
        this.org = org;
        this.target = target;
        this.fleet = fleet;
        this.description = description;
        
        
        this.status = 0;
        this.dispatchTime = Date.getTime();
        this.waypoints = [];
    }
}

//////////////////////////////////////////////////////////////////////////////
// Notes:
// 
//      Status
//          0: pending, 
//          1: in progress, 
//          2: completed, 
//          3: failed


// TODO:
//      1. find a way to add waypoints to the mission
//      2. set organization in environment variable

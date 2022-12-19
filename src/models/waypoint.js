export class Waypoint {
    constructor(id, position, target) {
        this.id = id;
        this.position = position;
        this.target = target;
    }
}

// we need to add a new waypoint to the mission
// so the mission needs to be updated
// but we also need to see the current mission state
// 
// think about how to do this, but 
// for now, don't worry about it
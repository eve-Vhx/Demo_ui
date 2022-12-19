//////////////////////////////////////////////////////////////////////////////
// This is the general data model for nests as they appear on the WEBSITE.
//    This is not the same as how they will appear in the database.
//    There are likely going to need to be a lot more variables here
//    as well. 
//
//      For now, we only need to know where the nest is and whether or not
//      it is occupied.
// 
//////////////////////////////////////////////////////////////////////////////
export class Nest {
    constructor(id, latitude, longitude, altitude) {
        this.id = id;
        this.position = [latitude, longitude, altitude];
    }
}

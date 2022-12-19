import React from "react";
import Map, { Layer, Marker, Popup, useMap } from "react-map-gl";
import maplibregl from "maplibre-gl";


// imports:
import "maplibre-gl/dist/maplibre-gl.css";
import drone_image from "../images/QROW_UI_new.png";
import nest_image from "../images/eve_nest.png";
import { gps_pos_tuple } from './RosCon';
import { useEffect, useState } from "react";


function MapVis(props) {

    var [gps_data, updateData] = useState([30.391,-97.727,0])
    var [nest_data, updateNestData] = useState([0,0,0])

    useEffect(() => {
        const interval = setInterval(() => {
          updateData(gps_data = props.drone_obj.gps_position);
          updateNestData(nest_data = props.nest_array);
          console.log(nest_data[0]);
        }, 500);
        return () => clearInterval(interval);
      }, []);


    return (
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
                latitude={ gps_data[0] }
                longitude={ gps_data[1] }
                anchor="center"
                color="blue"
                style={{ cursor: "pointer" }}
                rotation="0"
            >
                <img src={ drone_image } alt="" width="68px" height="60px"/>
            </Marker>

            <Marker
                latitude={nest_data[0].position[0]}
                longitude={nest_data[0].position[1]}
                anchor="center"
                rotation="0"
            >
                <img src={ nest_image } alt="" width="60px"/>
            </Marker>
            
            {nest_data.forEach(element => {
                return(
                    <Marker
                        latitude={30.392}
                        longitude={-97.727}
                        anchor="center"
                        style={{ cursor: "pointer" }}
                        rotation="0"
                    >
                    <img src={ nest_image } alt="" width="60px"/>
                    </Marker>
                )
                console.log("Printing element");
            })}
                
            
            


        </Map>
    )

}
  
export default MapVis;
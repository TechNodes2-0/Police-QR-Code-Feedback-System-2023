import React from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MapComponent = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={12}
    defaultCenter={props.center}
  >
    <Marker position={props.center} />
  </GoogleMap>
));

export default function GoogleMapComponent({ center }) {
  return (
    <MapComponent
      containerElement={<div style={{ height: "400px" }} />}
      mapElement={<div style={{ height: "100%" }} />}
      center={center} // Pass the center coordinates as a prop
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&v=3.exp&libraries=geometry,drawing,places`}
    />
  );
}

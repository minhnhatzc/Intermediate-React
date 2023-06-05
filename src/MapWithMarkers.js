import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
export default function MapWithMarkers() {
  const [markers, setMarkers] = useState([]);
  const handleMapClick = (event) => {
    const newMarker = {
      lat: event.lat,
      lng: event.lng,
      title: "New Marker",
    };
    setMarkers([...markers, newMarker]);
  };
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "YOUR_API_KEY" }}
        defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
        defaultZoom={12}
        onClick={handleMapClick}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            lat={marker.lat}
            lng={marker.lng}
            title={marker.title}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}
function Marker(props) {
  const [showInfo, setShowInfo] = useState(false);
  const handleMarkerClick = () => {
    setShowInfo(true);
  };
  const handleCloseClick = () => {
    setShowInfo(false);
  };
  return (
    <>
      <div onClick={handleMarkerClick}>Marker</div>
      {showInfo && (
        <div>
          <div>{props.title}</div>
          <button onClick={handleCloseClick}>Close</button>
        </div>
      )}
    </>
  );
}

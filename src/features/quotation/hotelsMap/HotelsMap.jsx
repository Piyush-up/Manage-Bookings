import React, { useState, useMemo } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const DEFAULT_CENTER = { lat: 51.5074, lng: -0.1278 }; // London

const HotelsMap = ({ type, data }) => {
  const [activeItem, setActiveItem] = useState(null);

  
  const locations = useMemo(() => {
    if (!data) return [];
    return Array.isArray(data) ? data : [data];
  }, [data]);


  const center = useMemo(() => {
    if (locations.length > 0) {
      const { lat, long } = locations[0];
      return { lat: Number(lat), lng: Number(long) };
    }
    return DEFAULT_CENTER;
  }, [locations]);

  if (!locations.length) {
    return <div style={{ padding: 20 }}>No map data available</div>;
  }

  
  const renderInfoContent = (item) => {
    switch (type) {
      case "htls":
        return (
          <>
            <strong>{item.Hotel}</strong>
            <p>{item.address}</p>
            <p>
              {item.CityName} ({item.countryCode})
            </p>
          </>
        );
      case "supplier":
        return (
          <>
            <strong>Supplier</strong>
            <p>{item.supplier}</p>
            <p>{item.city}</p>
          </>
        );
      case "route":
        return (
          <>
            <strong>City Route</strong>
            <p>{item.CityName}</p>
          </>
        );
      default:
        return <p>No data available</p>;
    }
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
        options={{
          fullscreenControl: true,
          mapTypeControl: true,
          streetViewControl: false,
        }}
      >
     
        {locations.map((item, index) => (
          <Marker
            key={index}
            position={{ lat: Number(item.lat), lng: Number(item.long) }}
            onClick={() => setActiveItem(item)}
          />
        ))}

     
        {activeItem && (
          <InfoWindow
            position={{ lat: Number(activeItem.lat), lng: Number(activeItem.long) }}
            onCloseClick={() => setActiveItem(null)}
          >
            <div style={{ maxWidth: 240 }}>{renderInfoContent(activeItem)}</div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default HotelsMap;

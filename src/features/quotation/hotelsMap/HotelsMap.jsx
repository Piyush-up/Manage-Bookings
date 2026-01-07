import React, { useState, useMemo } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const DEFAULT_CENTER = { lat: 51.5074, lng: -0.1278 }; // London

const HotelsMap = ({ data = [], type = "htls" }) => {
  const [activeItem, setActiveItem] = useState(null);

  const locations = useMemo(() => {
    if (!data) return [];
    return Array.isArray(data) ? data : [data];
  }, [data]);

  const center = useMemo(() => {
    if (locations.length > 0) {
      const { lat, lon } = locations[0];
      return { lat: Number(lat), lng: Number(lon) };
    }
    return DEFAULT_CENTER;
  }, [locations]);

  const renderInfoContent = (item) => {
    switch (type) {
      case "htls":
        return (
          <>
            <strong>{item.city}</strong>
            <p>{item.description}</p>
          </>
        );
      case "supplier":
        return (
          <>
            <strong>{item.hotel || "Supplier"}</strong>
            <p>{item.description}</p>
            <p>{item.address}</p>
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
            position={{
              lat: Number(item.lat),
              lng: Number(item.lon),
            }}
            onMouseOver={() => setActiveItem(item)}
            onMouseOut={() => setActiveItem(null)}
            onClick={() => setActiveItem(item)}
          />
        ))}

        {activeItem && (
          <InfoWindow
            position={{
              lat: Number(activeItem.lat),
              lng: Number(activeItem.lon),
            }}
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

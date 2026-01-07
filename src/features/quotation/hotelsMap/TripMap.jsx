import React, { useEffect, useMemo, useState, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const TripMap = React.memo(function TripMap({ selectedCities = [] }) {
  const [activeItem, setActiveItem] = useState(null);
  const [directions, setDirections] = useState(null);
  const [center, setCenter] = useState(null);
  const [parsedLocations, setParsedLocations] = useState([]);

  const geocodeCache = useRef({});

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const locations = useMemo(() => selectedCities, [selectedCities]);

  const geocodeCity = useCallback((city) => {
    if (geocodeCache.current[city]) {
      return Promise.resolve(geocodeCache.current[city]);
    }

    return new Promise((resolve, reject) => {
      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({ address: city }, (results, status) => {
        if (status === "OK") {
          const loc = results[0].geometry.location;
          const result = { name: city, lat: loc.lat(), lng: loc.lng() };
          geocodeCache.current[city] = result;
          resolve(result);
        } else {
          reject(status);
        }
      });
    });
  }, []);

  useEffect(() => {
    if (!isLoaded || locations.length === 0) {
      setParsedLocations([]);
      setDirections(null);
      setCenter(null);
      return;
    }

    Promise.all(locations.map(geocodeCity))
      .then((coords) => {
        setParsedLocations(coords);
        setDirections(null);
      })
      .catch(console.error);
  }, [isLoaded, locations, geocodeCity]);

  const isSingleLocation = parsedLocations.length === 1;
  const isMultiLocation = parsedLocations.length > 1;

  const buildRoute = useCallback(() => {
    if (!isLoaded || !isMultiLocation) return;

    const origin = parsedLocations[0];
    const destination = parsedLocations[parsedLocations.length - 1];

    const waypoints = parsedLocations.slice(1, -1).map((loc) => ({
      location: { lat: loc.lat, lng: loc.lng },
      stopover: true,
    }));

    const service = new window.google.maps.DirectionsService();

    service.route(
      {
        origin,
        destination,
        waypoints,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
          setCenter(origin);
        }
      }
    );
  }, [isLoaded, isMultiLocation, parsedLocations]);

  useEffect(() => {
    if (!isLoaded || parsedLocations.length === 0) return;

    if (isSingleLocation) {
      setCenter(parsedLocations[0]);
      setDirections(null);
    } else {
      buildRoute();
    }
  }, [isLoaded, parsedLocations, isSingleLocation, buildRoute]);

  if (!isLoaded || !center) return <p>Loading map...</p>;

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        {parsedLocations.map((city) => (
          <span
            key={city.name}
            style={{ marginRight: 12, cursor: "pointer" }}
            onClick={() => {
              setCenter({ lat: city.lat, lng: city.lng });
              setActiveItem(city);
            }}
          >
            📍 {city.name}
          </span>
        ))}
      </div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={isSingleLocation ? 8 : 6}
      >
        {parsedLocations.map((item) => (
          <Marker
            key={item.name}
            position={{ lat: item.lat, lng: item.lng }}
            onClick={() => setActiveItem(item)}
          />
        ))}

        {activeItem && (
          <InfoWindow
            position={{ lat: activeItem.lat, lng: activeItem.lng }}
            onCloseClick={() => setActiveItem(null)}
          >
            <strong>{activeItem.name}</strong>
          </InfoWindow>
        )}

        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
  );
});

export default TripMap;

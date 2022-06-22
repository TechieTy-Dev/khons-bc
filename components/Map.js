import { useEffect, useContext } from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import { UberContext } from "../context/uberContext";

const style = {
  wrapper: " flex-1 h-full w-full",
};

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  const { pickupCoordinates, dropoffCoordinates } = useContext(UberContext);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-99.29011, 39.39172],
      zoom: 3,
    });

    if (pickupCoordinates) {
      addToMap(map, pickupCoordinates);
    }
    if (dropoffCoordinates) {
      addToMap(map, dropoffCoordinates);
    }
    if (pickupCoordinates && dropoffCoordinates) {
      map.fitBounds([dropoffCoordinates, pickupCoordinates], {
        padding: 400,
      });
    }
  }, [pickupCoordinates, dropoffCoordinates]);

  const addToMap = (map, coordinates) => {
    const marker1 = new mapboxgl.Marker().setLngLat(coordinates).addToMap(map);
  };

  return <div className={style.wrapper} id="map" />;
};

export default Map;
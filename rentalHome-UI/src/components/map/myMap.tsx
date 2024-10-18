import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "./myMap.css"; 
import { useState } from "react";
import MapSearch from "./mapSearch";

interface MyMapProps {
  positions: LatLngExpression[]; 
  allowSelection?: boolean; 
  onLocationSelect?: (position: LatLngExpression) => void;
  center?: LatLngExpression | null ;
}

const MyMap: React.FC<MyMapProps> = ({
  positions,
  allowSelection = false,
  onLocationSelect,
  center
}) => {
  const [selectedPosition, setSelectedPosition] = useState<
    LatLngExpression | any
  >(null); // To store the newly selected position

  // Handle map clicks for selecting a position (only if allowSelection is true)
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        if (allowSelection) {
          const newPosition: LatLngExpression = [e.latlng.lat, e.latlng.lng];
          setSelectedPosition(newPosition);
          if (onLocationSelect) {
            onLocationSelect(newPosition); // Send the selected position to parent
          }
        }
      },
    });
    return null;
  };

  const handleMouseOver = (e: any) => {
    const marker = e.target;
    marker.openPopup();
  };

  const handleMouseOut = (e: any) => {
    const marker = e.target;
setTimeout(() => {
        marker.closePopup();
      }, 1000);
  };


  return (
    <MapContainer
    key={center ? center.toString() : 'default'}
      center={center || positions[0]}
      zoom={11}
      scrollWheelZoom={false}
      className="map-container"
      >
      {/* <MapSearch onCitySelect={handleCitySelect} /> */}
   <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

   {/* <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" /> */}




      {/* Render existing positions as markers */}
      {positions.map((position, index) => (
        <Marker
          key={index}
          position={position}
          eventHandlers={{
            mouseover: handleMouseOver,
            mouseout: handleMouseOut,
          }}
        >
          <Popup >Location {index + 1}</Popup>
   
        </Marker>
      ))}

      {/* Render the newly selected position as a marker */}
      {selectedPosition && (
        <Marker position={selectedPosition}>
          <Popup>
            Selected Location: {selectedPosition[0]}, {selectedPosition[1]}
          </Popup>
        </Marker>
      )}

      {/* Enable click handler only if allowSelection is true */}
      {allowSelection && <MapClickHandler />}
    </MapContainer>
  );
};

export default MyMap;

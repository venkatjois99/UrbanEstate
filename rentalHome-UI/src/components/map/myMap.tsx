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
import {Property} from "../../models/propertyModel"
import LandingPageCard from "../landingPage/Card/Card";

interface MyMapProps {
  properties:Property[];
  // positions: LatLngExpression[]; 
  allowSelection?: boolean; 
  onLocationSelect?: (position: LatLngExpression) => void;
  center?: LatLngExpression | null ;
}

const MyMap: React.FC<MyMapProps> = ({
  properties,
  // positions,
  allowSelection = false,
  onLocationSelect,
  center
}) => {
  const [selectedPosition, setSelectedPosition] = useState<
    LatLngExpression | any
  >(null); // To store the newly selected position
  const positions: LatLngExpression[] = properties.map((property) => [property.latitude, property.longitude] as LatLngExpression);

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
      }, 3000);
  };

  const defaultCenter: LatLngExpression = [12.9715987, 77.5945627];
  return (
    <MapContainer
    key={center ? center.toString() : 'default'}
    center={center || defaultCenter}
      zoom={12}
      scrollWheelZoom={true}
      className="map-container"
      >
        
   <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {positions.map((position, index) => (
        <Marker
          key={index}
          position={position}
          eventHandlers={{
            mouseover: handleMouseOver,
            mouseout: handleMouseOut,
          }}
        >
          <Popup>
            <div className="map-card-cont">
            <LandingPageCard item={properties[index]} small={true}/>
            </div>
    </Popup>
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

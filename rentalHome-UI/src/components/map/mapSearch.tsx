import React, { useState } from "react";
import axios from "axios";
import './mapSearch.css'

interface MapSearchProps {
  onCitySelect: ( location: [number, number]) => void;
}

const MapSearch: React.FC<MapSearchProps> = ({ onCitySelect }) => {
  const [selectedCity, setSelectedCity] = useState("");
  const [filteredCities, setFilteredCities] = useState<
    { name: string; lat: number; lon: number }[]
  >([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCityChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const city = event.target.value;
    setSelectedCity(city);

    if (city) {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search`,
          {
            params: {
              q: city,
              countrycodes: "IN", // Restrict search to India
              format: "json",
            },
          }
        );

        // Extract city data with names and coordinates for dropdown suggestions
        const citiesData = response.data
        .map((place: any) => ({
          name: place.display_name,
          lat: parseFloat(place.lat),
          lon: parseFloat(place.lon),
        }));

        setFilteredCities(citiesData);
        setShowDropdown(citiesData.length > 0);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    } else {
      setFilteredCities([]);
      setShowDropdown(false);
    }
  };

  const handleCitySelect = (city: string, lat: number, lon: number) => {
    setSelectedCity(city);
    setShowDropdown(false);
    onCitySelect( [lat, lon]); // Pass the selected city and its coordinates to parent
  };

  return (
    <div className="dropdown-container" >
      <div className="text-cont-m">
        <h5>See What’s near you</h5>
        <a href="/rent" className="link-cont">See All
          <img src="src/assets/icons/footerSearchArrow.svg" alt="arrow" />
        </a>
      </div>
      <input
        type="text"
        value={selectedCity}
        onChange={handleCityChange}
        placeholder="Enter city"
        onFocus={() => setShowDropdown(true)} // Show dropdown when focused
      />
      {showDropdown && (
        <ul className="dropdown-seacrh">
          {filteredCities.map((city, index) => (
            <li key={index} onClick={() => handleCitySelect(city.name, city.lat, city.lon)}>
              {city.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MapSearch;

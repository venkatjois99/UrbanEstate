import React, { useEffect, useRef, useState } from 'react';
import './mapSearch.css';

const MapSearch: React.FC<{ onCitySelect: (city: string) => void }> = ({ onCitySelect }) => {
  const [selectedCity, setSelectedCity] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const cities = ["Mumbai", "Bangalore", "Pune", "Chennai", "Hyderabad", "Delhi"];

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const city = event.target.value;
    setSelectedCity(city);

    // Filter cities based on input
    const filtered = cities.filter((c) =>
      c.toLowerCase().includes(city.toLowerCase())
    );
    setFilteredCities(filtered);

    // Show dropdown if there are filtered results
    setShowDropdown(filtered.length > 0);
    onCitySelect(city);
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setShowDropdown(false);
    onCitySelect(city); // Notify parent component
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <div className="text-cont-m">
        <h5>See What’s near you</h5>
        <a className="link-cont">See All
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
            <li key={index} onClick={() => handleCitySelect(city)}>
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MapSearch;

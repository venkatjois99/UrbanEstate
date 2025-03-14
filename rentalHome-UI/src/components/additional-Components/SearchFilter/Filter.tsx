import "./Filter.css";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

// Define the shape of the filter form state
const validationSchema = Yup.object().shape({
  location: Yup.string(),
  propertyType: Yup.string(),
  bhkType: Yup.string(),
  furnishing: Yup.string(),
  gender: Yup.string(),
});

const propertyTypeOptions: any = {
  house: ["1 BHK", "2 BHK", "3 BHK", "4 BHK"],
  apartment: ["1 BHK", "2 BHK", "3 BHK", "4 BHK"],
  pg: ["1 Sharing", "2 Sharing", "3 Sharing", "4 Sharing"],
  flatmates: [1, 2,3,4],
};

const SearchFilter: React.FC = () => {
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const cities = [
    "Mumbai",
    "Bangalore",
    "Pune",
    "Chennai",
    "Hyderabad",
    "Delhi",
  ];
  const navigate = useNavigate();
  // Initialize the filter form state using TypeScript types
  const SearchForm = useFormik({
    initialValues: {
      location: "",
      propertyType: "house",
      bhkType: "",
      furnishing: "",
      gender: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      // console.log(SearchForm.values);
      navigate("/rent", { state: { searchCriteria: SearchForm.values } });
    },
  });

  const handleInputChange = (event: { target: { value: any } }) => {
    const input = event.target.value;
    SearchForm.setFieldValue("location", input);

    if (input) {
      setFilteredCities(
        cities.filter((city) =>
          city.toLowerCase().includes(input.toLowerCase())
        )
      );
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleCitySelect = (city: string) => {
    SearchForm.setFieldValue("location", city);
    setShowDropdown(false);
  };

  return (
    <div>
      <form onSubmit={SearchForm.handleSubmit} className="searchfilter">
        <div className="top">
          <div className="d-flex flex-column">
            <div className="search-input-holder">
              <img
                src="src\assets\icons\ion_search-outline.svg"
                width={20}
                height={20}
              ></img>
              <input
                type="text"
                id="city"
                name="location"
                placeholder="Search city"
                value={SearchForm.values.location}
                onChange={handleInputChange}
                onFocus={() => setShowDropdown(true)}
              />
              {showDropdown && (
                <div className="filter-dropdown-cont">
                  <ul className="filter-dropdown-item">
                  {filteredCities.map((city, index) => (
                    <li key={index} onClick={() => handleCitySelect(city)}>
                      {city}
                    </li>
                  ))}
                </ul>
                </div>
              )}
            </div>
            {SearchForm.errors.location && (
              <div className="error">{SearchForm.errors.location}</div>
            )}
          </div>

          <select
            name="propertyType"
            id="propertyType"
            value={SearchForm.values.propertyType}
            onChange={SearchForm.handleChange}
          >
            {/* <option value="">Any</option> */}
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="pg">Paid Guest</option>
            <option value="flatmates">Flatmates</option>
          </select>
        </div>

        <div className="bottom">
          <select
            name="bhkType"
            id="bhkType"
            value={SearchForm.values.bhkType}
            onChange={SearchForm.handleChange}
            className="w2"
          >
            <option value="">Type | Room</option>
            {SearchForm.values.propertyType &&
              propertyTypeOptions[SearchForm.values.propertyType].map(
                (option: any) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                )
              )}
          </select>

          {(SearchForm.values.propertyType === "house" ||
            SearchForm.values.propertyType === "apartment") && (
            <select
              name="furnishing"
              id="furnishing"
              value={SearchForm.values.furnishing}
              onChange={SearchForm.handleChange}
              className="w2"
            >
              <option value="">Furnish Type</option>
              <option value="furnished">Furnished</option>
              <option value="semi-furnished">Semi-Furnished</option>
              <option value="unfurnished">Unfurnished</option>
            </select>
          )}

          {(SearchForm.values.propertyType === "pg" ||
            SearchForm.values.propertyType === "flatmates") && (
            <select
              name="gender"
              id="gender"
              value={SearchForm.values.gender}
              onChange={SearchForm.handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Colive">Co-living</option>
            </select>
          )}

          <button type="submit" className="w2">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchFilter;

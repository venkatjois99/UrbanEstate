import "./Filter.css";
import React from "react";
import {useFormik } from "formik";
import * as Yup from "yup";

// Define the shape of the filter form state
const validationSchema = Yup.object().shape({
  city: Yup.string().required("*City is required"),
  property: Yup.string().required("Property is required"),
  type: Yup.string().required("Type is required"),
  //   minPrice: Yup.number()
  //     .required("Min Price is required")
  //     .positive("Min Price must be a positive number"),
  //   maxPrice: Yup.number()
  //     .required("Max Price is required")
  //     .positive("Max Price must be a positive number"),
  availability: Yup.string(),
  gender: Yup.string(),
});

const propertyTypeOptions: any = {
  house: ["1 BHK", "2 BHK", "3 BHK", "4 BHK"],
  pg: ["1 Sharing", "2 Sharing", "3 Sharing", "4 Sharing"],
  flatmates: ["Shared Room", "Separate Room"],
};

const SearchFilter: React.FC = () => {
  // Initialize the filter form state using TypeScript types
  const SearchForm = useFormik({
    initialValues: {
      city: "",
      property: "house",
      type: "",
      //   minPrice: "",
      //   maxPrice: "",
      availability: "",
      gender: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      console.log(SearchForm.values);
    },
  });
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
                name="city"
                placeholder="Search address, city, location"
                value={SearchForm.values.city}
                onChange={SearchForm.handleChange}
              />
            </div>
            {SearchForm.errors.city && (
              <div className="error">{SearchForm.errors.city}</div>
            )}
          </div>

          <select
            name="property"
            id="property"
            value={SearchForm.values.property}
            onChange={SearchForm.handleChange}
            
          >
            {/* <option value="">Any</option> */}
            <option value="house" >
              House
            </option>
            <option value="pg">Paid Guest</option>
            <option value="flatmates">Flatmates</option>
          </select>
        
        </div>

        <div className="bottom">
          <select
            name="type"
            id="type"
            value={SearchForm.values.type}
            onChange={SearchForm.handleChange}
            className="w2"
          >
            <option value="">Type | Room</option>
            {SearchForm.values.property &&
              propertyTypeOptions[SearchForm.values.property].map(
                (option: any) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                )
              )}
          </select>

          {SearchForm.values.property === "house" && (
            <select
              name="availability"
              id="availability"
              value={SearchForm.values.availability}
              onChange={SearchForm.handleChange}
              className="w2"
            >
              <option disabled>Select option</option>
              <option value="immediate">Immediate</option>
              <option value="within15Days">Within 15 Days</option>
              <option value="within30Days">Within 30 Days</option>
              <option value="after30Days">After 30 Days</option>
            </select>
          )}

          {(SearchForm.values.property === "pg" ||
            SearchForm.values.property === "flatmates") && (
            <select
              name="gender"
              id="gender"
              value={SearchForm.values.gender}
              onChange={SearchForm.handleChange}
            >
              <option disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
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

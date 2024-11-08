import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './listPageSeacrh.css';
interface ListPageSearchProps {
initialValues: {
  location: string;
  propertyType: string;
  minPrice: number;
  maxPrice: number | null;
  furnishing: string;
  gender: string;
};
onSearch: (values: any) => void;
}

const ListPageSearch: React.FC<ListPageSearchProps> = ({ initialValues, onSearch }) => {
  const validationSchemaForListPage = Yup.object().shape({
    location: Yup.string().required("*City is required"),
    propertyType: Yup.string(),
    minPrice: Yup.number(),
    maxPrice: Yup.number().nullable(),
    furnishing: Yup.string(),
    gender: Yup.string(),
  });

  const listPageForm = useFormik({
    validationSchema: validationSchemaForListPage,
    initialValues,
    onSubmit: (values) => {
      onSearch(values);
    },
  });

  // Handle the price range selection
  const handlePriceRangeChange = (e:any) => {
    const selectedRange = e.target.value;
    if (selectedRange !== "0-10000") {
      const [min, max] = selectedRange.split('-').map(Number);
      listPageForm.setFieldValue('minPrice', min);
      listPageForm.setFieldValue('maxPrice', max);
    } else {
      listPageForm.setFieldValue('minPrice', 0);
      listPageForm.setFieldValue('maxPrice', 10000);
    }
  };

  return (
    <form className="list-page-search" onSubmit={listPageForm.handleSubmit}>
      <div className="list-page-search-filter">
        <h5>Location</h5>
        <select
          name="location"
          value={listPageForm.values.location}
          onChange={listPageForm.handleChange}
        >
          <option value="">Select Location</option>
          {["Mumbai", "Bangalore", "Pune", "Chennai", "Hyderabad", "Delhi"].map(
            (location) => (
              <option key={location} value={location}>
                {location}
              </option>
            )
          )}
        </select>
      </div>

      <div className="listpage-search-divider">
        <div className="list-page-line"></div>
      </div>

      <div className="list-page-search-filter">
        <h5>Type</h5>
        <select
          name="propertyType"
          value={listPageForm.values.propertyType}
          onChange={listPageForm.handleChange}
        >
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="pg">Paid Guest</option>
          <option value="flatmates">Flatmates</option>
        </select>
      </div>

      <div className="listpage-search-divider">
        <div className="list-page-line"></div>
      </div>

      <div className="list-page-search-filter">
        <h5>Price Range</h5>
        <select
          name="priceRange"
          onChange={handlePriceRangeChange}
        >
          <option value="0-1000000000000">Any Price</option>
          <option value="0-10000">{"<"}10,000</option>
          <option value="10000-20000">10,000 - 20,000</option>
          <option value="20000-30000">20,000 - 30,000</option>
          <option value="30000-50000">30,000 - 50,000</option>
          <option value="50000-70000">50,000 - 70,000</option>
          <option value="70000-1000000000000"> {'>'}70,000</option>
        </select>
      </div>

      <div className="listpage-search-divider">
        <div className="list-page-line"></div>
      </div>

      <div className="list-page-search-filter">
        
        {(listPageForm.values.propertyType === "house"|| listPageForm.values.propertyType === "apartment") && (
          <>  <h5>Furnishing</h5>
          <select
            name="furnishing"
            value={listPageForm.values.furnishing}
            onChange={listPageForm.handleChange}
          >
            <option value="">Select Furnishing</option>
            <option value="furnished">Furnished</option>
            <option value="semi-furnished">Semi-Furnished</option>
            <option value="unfurnished">Unfurnished</option>
          </select>
          </>
        )}

        {(listPageForm.values.propertyType === "pg" ||
          listPageForm.values.propertyType === "flatmates") && (
            <>  <h5>Gender</h5>
          <select
            name="gender"
            value={listPageForm.values.gender}
            onChange={listPageForm.handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Colive">Co-living</option>
          </select>
          </>
        )}
      </div>
      <button type='submit'><img src='src\assets\icons\listPageSearch.svg' alt='search'></img></button>
    </form>
  );
};

export default ListPageSearch;

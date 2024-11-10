import "./listpage.css";
import MyMap from "../../../map/myMap";
import { LatLngExpression } from "leaflet";
import { useState,useEffect } from "react";
import Footer from "../../../footer/footer";
import ListPageCard from "../../../additional-Components/listPageCard/listPageCard";
import ListPageSearch from "../../../additional-Components/listPageSearch/listPageSearch";
import { useDispatch} from 'react-redux';
import { getPropertiesThunk } from '../../../../RentalServices/Slicer/Property/propertyThunk';
import { AppDispatch } from "../../../../store/myAppStore";
import { useLocation } from "react-router-dom";
import { Property } from "../../../../models/propertyModel";

const ListPage: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const [properties, setProperties] = useState<Property[]>([]);
  const location = useLocation();
  const initialSearchCriteria = location.state?.searchCriteria || {}; // Use searchCriteria from location or an empty object
  // console.log(initialSearchCriteria)
  const [searchCriteria, setSearchCriteria] = useState(initialSearchCriteria);
  // console.log(searchCriteria);
 
  useEffect(() => {
    const fetchProperties = async () => {
      const res = await dispatch(getPropertiesThunk());
      if (res.payload && JSON.stringify(res.payload) !== JSON.stringify(properties)) {
        setProperties(res.payload);
      }
    };
    fetchProperties();
  }, [dispatch]);
  
  const initialSearchValues = {
    location: searchCriteria?.location || 'Bangalore',
    propertyType: searchCriteria?.propertyType || 'house',
    minPrice: 0,
    maxPrice: null,
    furnishing: '',
    gender: '',
  };

  const handleListPageSearch = (values: any) => {
    setSearchCriteria(values);
  };
  const filteredProperties: Property[] = properties.filter(property => {
    if (!searchCriteria) return true; // If no searchCriteria, include all properties
  
    let matches = true;
  
    if (searchCriteria.location) {
      matches = matches && property.location == searchCriteria.location;
    }
    if (searchCriteria.propertyType) {
      matches = matches && property.propertyType === searchCriteria.propertyType;
    }
    if (searchCriteria.bhkType) {
      matches = matches && (property.bhkType === searchCriteria.bhkType || property.pgSharingType === searchCriteria.bhkType || property.sharedBedrooms == searchCriteria.bhkType);
    }
    if (searchCriteria.minPrice !== undefined && searchCriteria.minPrice !== null) {
      matches = matches && property.rent >= searchCriteria.minPrice;
    }
    if (searchCriteria.maxPrice !== undefined && searchCriteria.maxPrice !== null) {
      matches = matches && property.rent <= searchCriteria.maxPrice;
    }
    if (searchCriteria.furnishing) {
      matches = matches && property.furnishing === searchCriteria.furnishing;
    }
    if (searchCriteria.gender) {
      matches = matches && (property.pgLivingType === searchCriteria.gender || property.preferredFlatmate === searchCriteria.gender);
    }

    return matches;
  });
  

  const propertiesToDisplay: Property[] = searchCriteria ? filteredProperties : properties;

    // console.log(propertiesToDisplay);
  
    

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4;
  const totalPages = Math.ceil(propertiesToDisplay.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const paginationProperties = propertiesToDisplay.slice(startIndex, startIndex + cardsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      sessionStorage.setItem("currentPage", page.toString());
    }
  };

  useEffect(() => {
    const savedPage = sessionStorage.getItem("currentPage");
    if (savedPage) {
      setCurrentPage(parseInt(savedPage, 10));
    }
  }, []);


  const mapCenter: LatLngExpression | null = propertiesToDisplay.length > 0 
    ? [propertiesToDisplay[0].latitude, propertiesToDisplay[0].longitude] as LatLngExpression
    : null;
  return (
    <>
      <div className="list-page">
        <div className="list-page-search-cont">
          <div className="list-page-search-holder">
          <ListPageSearch initialValues={initialSearchValues} onSearch={handleListPageSearch} />
          </div>
        </div>
        <div className="list-page-results">
          <h3>Your Search Results</h3>
          {searchCriteria  && (
    <p>{searchCriteria.location}</p>
  )}  
      <div className="list-page-card-cont">
        {paginationProperties.map((property) => (
          <ListPageCard key={property.id} item={property} extraShow={true} />
        ))}
        <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center gap-3 mt-5">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              {/* <span className="sr-only">Previous</span> */}
            </button>
          </li>
          
          {[...Array(totalPages)].map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
              <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}

          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              {/* <span className="sr-only">Next</span> */}
            </button>
          </li>
        </ul>
      </nav>
      </div>

      {/* Bootstrap Pagination */}
      
   
   <div className="d-flex gap-4 mt-5">
     <div className="explore-near-cont">
     <h5>Featured Properties</h5>
    <p>Our Best Picks</p>
    {properties.slice(0, 3).map((property) => (
  <ListPageCard key={property.id} item={property} extraShow={false} />
))}
      </div>
      <div className="list-map-cont">
      <MyMap
            properties={propertiesToDisplay}
           center={mapCenter}
            allowSelection={false}
          />
        </div> 
        </div>
        </div>
  
      </div>
      
 <Footer showExtra={false} /> 
    </>
  );
};

export default ListPage;


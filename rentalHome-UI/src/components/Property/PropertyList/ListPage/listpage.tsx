import "./listpage.css";
import NavBars from "../../../header/header";
import MyMap from "../../../map/myMap";
import { LatLngExpression } from "leaflet";
import { useState,useEffect } from "react";
import Footer from "../../../footer/footer";
import ListPageCard from "../../../additional-Components/listPageCard/listPageCard";
import ApartmentItem from "../../../../models/listCardModel";
import ListPageSearch from "../../../additional-Components/listPageSearch/listPageSearch";
import { useDispatch } from 'react-redux';
import { getPropertiesThunk } from '../../../../RentalServices/Slicer/Property/propertyThunk';
import { AppDispatch } from "../../../../store/myAppStore";

// Define the type for each item in the list dat

const ListPage: React.FC = () => {
  const apartments: ApartmentItem[] = [
    {
      id: 1,
      name: "Sunny Side Apartments",
      img: "https://agoldbergphoto.com/wp-content/uploads/residential/Residential-13-scaled.jpg",
      price: 1500,
      address: "123 Sunshine Ave, Los Angeles, CA",
      description:
        "A cozy and well-lit apartment located in the heart of the city with stunning views of the skyline.",
    },
    {
      id: 2,
      name: "Downtown Lofts",
      img: "https://cdn.architecturendesign.net/wp-content/uploads/2015/06/Estuary-Custom-4-13.jpg",
      price: 1800,
      address: "456 Market St, San Francisco, CA",
      description:
        "Modern lofts with open spaces, perfect for urban living in downtown San Francisco.",
    },
    {
      id: 3,
      name: "Ocean Breeze Condos",
      img: "https://www.tollbrothers.com/blog/wp-content/uploads/2019/02/9-Solano-Bianca_Kitchen-to-Outdoor-Room.jpg",
      price: 2000,
      address: "789 Beachfront Blvd, Miami, FL",
      description:
        "Enjoy beachfront living with this spacious condo that offers breathtaking views of the ocean.",
    },
    {
      id: 4,
      name: "Sunny Side Apartments",
      img: "https://agoldbergphoto.com/wp-content/uploads/residential/Residential-13-scaled.jpg",
      price: 1500,
      address: "123 Sunshine Ave, Los Angeles, CA",
      description:
        "A cozy and well-lit apartment located in the heart of the city with stunning views of the skyline.",
    },
    {
      id: 5,
      name: "Downtown Lofts",
      img: "https://cdn.architecturendesign.net/wp-content/uploads/2015/06/Estuary-Custom-4-13.jpg",
      price: 1800,
      address: "456 Market St, San Francisco, CA",
      description:
        "Modern lofts with open spaces, perfect for urban living in downtown San Francisco.",
    },
    {
      id: 6,
      name: "Ocean Breeze Condos",
      img: "https://www.tollbrothers.com/blog/wp-content/uploads/2019/02/9-Solano-Bianca_Kitchen-to-Outdoor-Room.jpg",
      price: 2000,
      address: "789 Beachfront Blvd, Miami, FL",
      description:
        "Enjoy beachfront living with this spacious condo that offers breathtaking views of the ocean.",
    },
    {
      id: 7,
      name: "Sunny Side Apartments",
      img: "https://agoldbergphoto.com/wp-content/uploads/residential/Residential-13-scaled.jpg",
      price: 1500,
      address: "123 Sunshine Ave, Los Angeles, CA",
      description:
        "A cozy and well-lit apartment located in the heart of the city with stunning views of the skyline.",
    },
    {
      id: 8,
      name: "Downtown Lofts",
      img: "https://cdn.architecturendesign.net/wp-content/uploads/2015/06/Estuary-Custom-4-13.jpg",
      price: 1800,
      address: "456 Market St, San Francisco, CA",
      description:
        "Modern lofts with open spaces, perfect for urban living in downtown San Francisco.",
    },
    {
      id: 9,
      name: "Ocean Breeze Condos",
      img: "https://www.tollbrothers.com/blog/wp-content/uploads/2019/02/9-Solano-Bianca_Kitchen-to-Outdoor-Room.jpg",
      price: 2000,
      address: "789 Beachfront Blvd, Miami, FL",
      description:
        "Enjoy beachfront living with this spacious condo that offers breathtaking views of the ocean.",
    },
  ];
  const houses :ApartmentItem[]=[
    {
      id: 1,
      name: "Sunny Side Apartments",
      img: "https://agoldbergphoto.com/wp-content/uploads/residential/Residential-13-scaled.jpg",
      price: 1500,
      address: "123 Sunshine Ave, Los Angeles, CA",
      description:
        "A cozy and well-lit apartment located in the heart of the city with stunning views of the skyline.",
    },
    {
      id: 2,
      name: "Downtown Lofts",
      img: "https://cdn.architecturendesign.net/wp-content/uploads/2015/06/Estuary-Custom-4-13.jpg",
      price: 1800,
      address: "456 Market St, San Francisco, CA",
      description:
        "Modern lofts with open spaces, perfect for urban living in downtown San Francisco.",
    },
    {
      id: 3,
      name: "Ocean Breeze Condos",
      img: "https://www.tollbrothers.com/blog/wp-content/uploads/2019/02/9-Solano-Bianca_Kitchen-to-Outdoor-Room.jpg",
      price: 2000,
      address: "789 Beachfront Blvd, Miami, FL",
      description:
        "Enjoy beachfront living with this spacious condo that offers breathtaking views of the ocean.",
    },
  ]

  const [mapCenter, setMapCenter] = useState<LatLngExpression | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>("Bangalore");

  const cityLocations: Record<string, LatLngExpression[]> = {
    Bangalore: [
      [12.9715987, 77.5945627], // Bangalore City Center
      [12.935192, 77.6244807], // Koramangala
    ],
    Chennai: [
      [13.0827, 80.2707],
      [13.067439, 80.237617],
    ],
    Delhi: [
      [28.6139, 77.209],
      [28.7041, 77.1025],
    ],
  };
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchProperties = async () => {
      const res =await dispatch(getPropertiesThunk());
      console.log(res.payload);
    };

    fetchProperties();
  }, [dispatch]);

  useEffect(() => {
    
    if (selectedCity) {
      const locations = cityLocations[selectedCity];
      setMapCenter(locations[0]);
    }
  }, [selectedCity]);

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4;
  const totalPages = Math.ceil(apartments.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentApartments = apartments.slice(startIndex, startIndex + cardsPerPage);

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

  return (
    <>
      <NavBars />
      <div className="list-page">
        <div className="list-page-search-cont">
          <div className="list-page-search-holder">
            <ListPageSearch />
          </div>
        </div>
        <div className="list-page-results">
          <h3>Your Search Results</h3>
          <p>Houses in Banashankari</p>
      
      <div className="list-page-card-cont">
        {currentApartments.map((apartment) => (
          <ListPageCard key={apartment.id} item={apartment} extraShow={true} />
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
              <span className="sr-only">Next</span>
            </button>
          </li>
        </ul>
      </nav>
      </div>

      {/* Bootstrap Pagination */}
      
   
   <div className="d-flex gap-4 mt-5">
 
     <div className="explore-near-cont">
     <h5>Places near Banshankari</h5>
    <p>Our Best Picks</p>
        {houses.map((house) => (
          <ListPageCard key={house.id} item={house} extraShow={false} />
        ))}
      </div>
      <div className="list-map-cont">
      <MyMap
            positions={
               cityLocations["Bangalore"]
            } // Use all locations of selected city
           center={mapCenter}
            allowSelection={false}
          />
        </div> </div>
        </div>
  
      </div>
      
 <Footer /> 
    </>
  );
};

export default ListPage;


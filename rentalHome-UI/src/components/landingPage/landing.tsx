import "./landing.css";
import ApartmentIcon from "../../assets/icons/apartmentIcon";
import HouseIcon from "../../assets/icons/houseIcon";
import PgIcon from "../../assets/icons/pgIcon";
import FlatmatesIcon from "../../assets/icons/flatmatesIcon";
import MyMap from "../map/myMap";
import { LatLngExpression } from "leaflet";
import { useState, useEffect } from "react";
import MapSearch from "../map/mapSearch";
import CommentCard from "../additional-Components/commentCard/commentCard";
import Footer from "../footer/footer";
import SearchFilter from "../additional-Components/SearchFilter/Filter";
import LandingPageCard from './Card/Card'
import { AppDispatch } from "../../store/myAppStore";
import { useDispatch, useSelector } from 'react-redux';
import { getPropertiesThunk } from "../../RentalServices/Slicer/Property/propertyThunk";
import { getPropertiesCount } from "../../RentalServices/Services/propertyService";
import { Property } from "../../models/propertyModel";
import { Feedback } from "../../models/feedbackModel";
import { getFeedbacks } from "../../RentalServices/Services/feedbackService";

export default function Landing() {
  const [mapCenter, setMapCenter] = useState<LatLngExpression | null>(null);
  const [selectedPropertyType, setSelectedPropertyType] = useState<string | null>(null);
  const [comments, setComments] = useState<Feedback[]>([]);
  const [propertyCounts, setPropertyCounts] = useState({
    apartment: 0,
    house: 0,
    pg: 0,
    flatmates:0
  });
  const handleCitySelect = (location: [number, number]) => {
    setMapCenter(location); // Set the map center to the selected city location
  };

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchProperties = async () => {
      const res = await dispatch(getPropertiesThunk());
      // console.log(res.payload);
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    const fetchPropertiesCount = async () => {
      const res = await (getPropertiesCount());
      // console.log(res);
      setPropertyCounts(res);
    };
    fetchPropertiesCount();
  }, []);

  useEffect(() => {
    const fetchFeedbacks = async () => {
        const res = await getFeedbacks(); // Assuming this fetches the feedback data
        setComments(res); // Update state with the fetched data
    };
    fetchFeedbacks(); // Call the function to fetch data
  }, []);

  const handleIconClick = (type: string) => {
    setSelectedPropertyType(type);
  };

  const properties: Property[] = useSelector((state: { property: { properties: any; }; }) => state.property.properties);
  const filteredProperties = selectedPropertyType ? properties.filter(property => property.propertyType === selectedPropertyType): properties;
  return (
    <>
      <div className="landing-cont-2">
        <div className="hero-cont">
           {/*------------ Landing main container---------  */}
          <div className="header-caption">
            <h1>Find a Room, Make It Home</h1>
            <p>Discover Your Next Home Away from Home</p>
          </div>
          {/* ------------SeacrhFilter Container */}
          <div className="card-search-cont">
            <div className="count-card-cont">
              <div className="count-card">
                <p className="card-title">{propertyCounts.apartment}+</p>
                <p className="card-text">Private Flat</p>
              </div>
              <div className="count-card">
                <p className="card-title">{propertyCounts.house}+</p>
                <p className="card-text">Houses</p>
              </div>
              <div className="count-card">
                <p className="card-title">{propertyCounts.pg}+</p>
                <p className="card-text">PG Rooms </p>
              </div>
              <div className="count-card">
                <p className="card-title">{propertyCounts.flatmates ? propertyCounts.flatmates:0}+</p>
                <p className="card-text">Shared Rooms</p>
              </div>
            </div>
            <div className="search-cont">
              <SearchFilter />
            </div>
          </div>
        </div>
        {/* -------------static information container ----------- */}
        <div className="info-text-cont">
          <div className="info-img"></div>
          <div className="info-text">
            <h3>
              How It works?
              <br />
              Find a perfect home
            </h3>
            <div className="icon-text-cont">
              <img
                src="src\assets\icons\searchFilterIcon.svg"
                alt="search"
              ></img>
              <div>
                <h5>Search & Filter</h5>
                <p>
                  Easily find your ideal room by using our advanced search
                  options and filters to narrow down results based on location,
                  price, and amenities.
                </p>
              </div>
            </div>
            <div className="icon-text-cont">
              <img
                src="src\assets\icons\verifyChooseIcon.svg"
                alt="verify"
              ></img>
              <div>
                <h5>Verify & Choose</h5>
                <p>
                  Explore verified listings to ensure authenticity and make your
                  choice with confidence from a range of options that match your
                  preferences.
                </p>
              </div>
            </div>
            <div className="icon-text-cont">
              <img src="src\assets\icons\payment.svg" alt="secure"></img>
              <div>
                <h5>Secure Payment</h5>
                <p>
  We ensure your transaction is secure with the owner and provide support throughout the contract process, giving you peace of mind.
</p>
              </div>
            </div>
            <div className="icon-text-cont">
              <img src="src\assets\icons\enjoyIcon.svg" alt="enjoy"></img>
              <div>
                <h5>Enjoy & Manage</h5>
                <p>
  Move in and enjoy your new space, while we provide ongoing support to help you manage rental details, requests, and payments effortlessly.
</p>
              </div>
            </div>
          </div>
          <div></div>
        </div>
        {/* -------------Icon search and card container------------- */}
        <div className="property-list-cont">

          <div>
            <h3>How Can We Help?</h3>
            <div className="icon-cont">
              <ApartmentIcon className="icon" onIconClick={() => handleIconClick('apartment')} isSelected={selectedPropertyType} />
              <HouseIcon className="icon" onIconClick={() => handleIconClick('house')} isSelected={selectedPropertyType} />
              <PgIcon className="icon" onIconClick={() => handleIconClick('pg')} isSelected={selectedPropertyType} />
              <FlatmatesIcon className="icon" onIconClick={() => handleIconClick('flatmates')} isSelected={selectedPropertyType} />
            </div>
          </div>
          <div className="landing-card-cont">
            {filteredProperties.slice(0, 6).map((property) => (
                  <LandingPageCard key={property.id} item={property} small={false} />
            ))}
          </div>

          <div className="card-cont">
            <h3>Our most Popular Houses</h3>
            <div></div>
          </div>
        </div>
        {/* --------------Review Container -------------------- */}
        <div className="review-cont">
        <div> 
          <h3> What our<br />Customers say?</h3>
            <div className="comment-cont">
              <div className="comment-carousel">
                {comments.length === 0 ? (
                  <p>No feedback available.</p>
                ) : (
                  comments.map((comment, index) => (
                    <CommentCard
                      key={index}
                      name={comment.userName}
                      location={comment.location}
                      comment={comment.feedbackText}
                      rating={comment.rating}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="sidebar-cont"></div>
        </div>
        {/* ----------------Map and map Search container --------------- */}
        <div className="map-cont">
          <MyMap
            properties={properties} // Use all locations of selected city
            center={mapCenter}
            allowSelection={false}
          />
          <div className="map-search-container">
            <MapSearch onCitySelect={handleCitySelect} />
          </div>
        </div>
        <Footer showExtra={true} />
      </div>
    </>
  );
}
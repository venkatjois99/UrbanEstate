import Carousel from "react-bootstrap/Carousel";

import NavBars from "../header/header";
import "./landing.css";

import ApartmentIcon from "../../assets/icons/apartmentIcon";
import HouseIcon from "../../assets/icons/houseIcon";
import PgIcon from "../../assets/icons/pgIcon";
import HotelRoomIcon from "../../assets/icons/hotelRoomIcon";
import MyMap from "../map/myMap";
import { LatLngExpression } from "leaflet";
import { useState } from "react";
import MapSearch from "../map/mapSearch";
import CommentCard from "../additional-Components/commentCard/commentCard";
import Footer from "../footer/footer";
import SearchFilter from "../additional-Components/SearchFilter/Filter";

export default function Landing() {
  const [mapCenter, setMapCenter] = useState<LatLngExpression | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>(""); // State for selected city
  const comments = [
    {
      name: "Alice Johnson",
      location: "San Francisco",
      comment:
        "Urban Estate made finding my perfect apartment so easy! The verified listings gave me peace of mind, and the whole process was smooth from start to finish.",
      profileImage:
        "https://images.pexels.com/photos/7562313/pexels-photo-7562313.jpeg",
      rating: 4.5,
    },
    {
      name: "Bob Smith",
      location: "New York",
      comment:
        "Urban Estate made finding my perfect apartment so easy! The verified listings gave me peace of mind, and the whole process was smooth from start to finish.",
      profileImage:
        "https://images.pexels.com/photos/7562313/pexels-photo-7562313.jpeg",
      rating: 4,
    },
    {
      name: "Sumanth Johnson",
      location: "San Francisco",
      comment:
        "Urban Estate made finding my perfect apartment so easy! The verified listings gave me peace of mind, and the whole process was smooth from start to finish.",
      profileImage:
        "https://images.pexels.com/photos/7562313/pexels-photo-7562313.jpeg",
      rating: 3.5,
    },
    {
      name: "Bob Smith",
      location: "New York",
      comment:
        "Urban Estate made finding my perfect apartment so easy! The verified listings gave me peace of mind, and the whole process was smooth from start to finish.",
      profileImage:
        "https://images.pexels.com/photos/7562313/pexels-photo-7562313.jpeg",
      rating: 5,
    },
    {
      name: "Abhishek Johnson",
      location: "San Francisco",
      comment:
        "Urban Estate made finding my perfect apartment so easy! The verified listings gave me peace of mind, and the whole process was smooth from start to finish.",
      profileImage:
        "https://images.pexels.com/photos/7562313/pexels-photo-7562313.jpeg",
      rating: 4.5,
    },
    {
      name: "Sagar Smith",
      location: "New York",
      comment:
        "Urban Estate made finding my perfect apartment so easy! The verified listings gave me peace of mind, and the whole process was smooth from start to finish.",
      profileImage:
        "https://images.pexels.com/photos/7562313/pexels-photo-7562313.jpeg",
      rating: 3.5,
    },
  ];

  // Locations array for each city
  const cityLocations: Record<string, LatLngExpression[]> = {
    Bangalore: [
      [12.9715987, 77.5945627], // Bangalore City Center
      [12.935192, 77.6244807], // Koramangala
      [12.914641935578215, 77.5565153360094],
      [12.849954307349948, 77.65718400475636],
      [13.0057, 76.096],
    ],
    Chennai: [
      [13.0827, 80.2707], // Chennai City Center
      [13.067439, 80.237617], // Anna Nagar
      [13.0825, 80.2705], // T Nagar
    ],
    Delhi: [
      [28.6139, 77.209], // Delhi City Center
      [28.7041, 77.1025], // New Delhi
      [28.5355, 77.391], // Noida
    ],
  };

  const handleCitySelect = (city: string, location: [number, number]) => {
    setSelectedCity(city);
    setMapCenter(location); // Set the map center to the selected city location
  };

  return (
    <>
      <NavBars />

      <div className="landing-cont-2">
        <div className="hero-cont">
          <div className="header-caption">
            <h1>Find a Room, Make It Home</h1>
            <p>Discover Your Next Home Away from Home</p>
          </div>
          <div className="count-card-cont">
            <div className="count-card">
              <p className="card-title">165+</p>
              <p className="card-text">Private Flat</p>
            </div>
            <div className="count-card">
              <p className="card-title">165+</p>
              <p className="card-text">PG Rooms</p>
            </div>
            <div className="count-card">
              <p className="card-title">165</p>
              <p className="card-text">Shared Rooms</p>
            </div>
            <div className="count-card">
              <p className="card-title">165</p>
              <p className="card-text">Hotel Rooms</p>
            </div>
          </div>
          <div className="search-cont">
            <SearchFilter />
          </div>
        </div>
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
                  Complete your booking with secure payment options and receive
                  instant confirmation, ensuring a smooth and trustworthy
                  transaction.
                </p>
              </div>
            </div>
            <div className="icon-text-cont">
              <img src="src\assets\icons\enjoyIcon.svg" alt="enjoy"></img>
              <div>
                <h5>Enjoy & Manage</h5>
                <p>
                  Move in and enjoy your new space while managing your rental
                  details, requests, and payments effortlessly through our
                  user-friendly platform.
                </p>
              </div>
            </div>
          </div>
          <div></div>
        </div>

        <div className="property-list-cont">
          <div>
            <h3>How Can We Help?</h3>
            <div className="icon-cont">
              <ApartmentIcon className="icon" />
              <HouseIcon className="icon" />
              <PgIcon className="icon" />
              <HotelRoomIcon className="icon" />
            </div>
          </div>
          <div className="card-cont">
            <h3>Our most Popular Houses</h3>
            <div></div>
          </div>
        </div>
        <div className="review-cont">

         <div>
         <h3>
              What our
              <br />
              Customers say?
            </h3>
        
          <div className="comment-cont">
          
            <div className="comment-carousel">
              {comments.concat(comments).map((comment, index) => (
                <CommentCard
                  key={index}
                  name={comment.name}
                  location={comment.location}
                  comment={comment.comment}
                  profileImage={comment.profileImage}
                  rating={comment.rating}
                />
              ))}
            </div>
          </div>
          </div>
          <div className="sidebar-cont"></div>
        </div>
         
        <div className="map-cont">
          <MyMap
            positions={
              cityLocations[selectedCity] || cityLocations["Bangalore"]
            } // Use all locations of selected city
            center={mapCenter}
            allowSelection={false}
          />
          <div className="map-search-container">
            <MapSearch onCitySelect={handleCitySelect} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

function CarousalItemLanding() {
  return (
    <div className="carousal-container">
      <Carousel slide={true} controls={false} fade>
        <Carousel.Item>
          <div className="img-holder bg-image-1"></div>
          <Carousel.Caption>
            <h2>Move-In Made Easy: Book Your Ideal Space!</h2>
            <p>Helping renters find their perfect fit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="img-holder bg-image-2"></div>
          <Carousel.Caption>
            <h2>Move-In Made Easy: Book Your Ideal Space!</h2>
            <p>Helping renters find their perfect fit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="img-holder bg-image-3"></div>
          <Carousel.Caption>
            <h2>Move-In Made Easy: Book Your Ideal Space!</h2>
            <p>Helping renters find their perfect fit.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

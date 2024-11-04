import { FaRupeeSign, FaPhone, FaHeart, FaPaperPlane, FaCalendarAlt, FaBed, FaChair } from 'react-icons/fa'; // for rupee sign
import { userData } from '../../../assets/dummyData/dummyData';
import Slider from '../../additional-Components/ImageSlider/slider';
import Footer from '../../footer/footer';
import './propertyDetails.css'
import { useLocation } from 'react-router-dom';
import { Property } from '../../../models/propertyModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from "react";
import NavBars from '../../header/header';
import ChatBox from '../../../components/additional-Components/ChatBox/chatBox';
import {useDispatch, useSelector } from "react-redux";
import { RootState,AppDispatch } from "../../../store/myAppStore";
import { initializeUserFromToken } from '../../../RentalServices/Slicer/user/userThunk';

const PropertyDetails = () => {
  const userIdFromStore = useSelector((state: RootState) => state.user.userId);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(initializeUserFromToken());
}, [dispatch]);
  const location = useLocation();
  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, []);
  const propertyItem: Property = location.state?.property;
  console.log(propertyItem);
  if (!propertyItem) {
    return <div>Property not found</div>; // Handle case when property is not found
  }
  return (
    <div>
      <NavBars />
      <div className="singlePage">
        {/* Image Slider */}
        <div className="imageSection">
          <Slider images={propertyItem.images} />
        </div>
        {/* Container for Info and Right Section */}
        <div className="contentContainer">
          {/* Info Section */}
          <div className="infoSection">
            <div className="topSection">
              <div className="titleRatingSection">
                <h1>{propertyItem.title}</h1>
                {/* <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < propertyItem.rating ? "star filled" : "star"}
                      />
                    ))}
                    <span>
                      {propertyItem.rating} ({propertyItem.reviews}+)
                    </span>
                  </div> */}
              </div>

              <div className="priceIconContainer">
                <div className="priceSection">
                  <FaRupeeSign />
                  <span className="price">{propertyItem.rent}</span>
                </div>

                <div className="iconSection">
                  <div className="iconItem">
                    <FaCalendarAlt color="#216B9B" /> <span>Posted Date: {propertyItem.postingDate.slice(0, propertyItem.postingDate.indexOf('T'))}</span>
                  </div>
                  <div className="iconItem">
                    <FaBed color="#216B9B" /> <span> {propertyItem.propertyType === 'apartment' || propertyItem.propertyType === 'house' ? propertyItem.bhkType :
                      propertyItem.propertyType === 'pg' ? ` ${propertyItem.pgSharingType} sharing` :
                        propertyItem.propertyType === 'flatmates' ? `${propertyItem.sharedBedrooms} Room` : ''}</span>
                  </div>
                  <div className="iconItem">
                    {propertyItem.propertyType === 'apartment' || propertyItem.propertyType === 'house' ? <> <FontAwesomeIcon icon={faChair} color="#216B9B" /> {propertyItem.furnishing} </> : ''}
                    {propertyItem.propertyType === 'pg' ? <><FontAwesomeIcon icon={faUsers} color="#216B9B" /> {propertyItem.pgLivingType}</> : ''}
                    {propertyItem.propertyType === 'flatmates' ? <><FontAwesomeIcon icon={faUsers} color="#216B9B" />{propertyItem.preferredFlatmate} Gender </> : ''}
                  </div>
                  {/* <div className="iconItem">
                      <MdAccountBalance />{" "}
                      <span>
                        {propertyItem.depositRequired ? "Deposit required" : "No deposit"}
                      </span>
                    </div> */}
                </div>
              </div>

              <p className="address">{propertyItem.address}</p>
              <p className="description">{propertyItem.description}</p>
            </div>

            {/* Buttons */}
            <div className="buttonSection">
              <button className="btn-singlePage favourite">
                <FaHeart /> Add to Favourites
              </button>
              <button className="btn-singlePage call">
                <FaPhone /> Call Property
              </button>
              {/* <button className="btn notify">
                  <FaBell /> Notify Owner
                </button> */}
            </div>
          </div>


          {/* Right Section */}
          <div className="rightSection">
            {/* Contact Form */}
            {/* <div className="contactOwner">
              <h3>Contact the Owner</h3>
              <form className="contactForm">
                <input type="text" placeholder="Full name" />
                <input type="text" placeholder="Phone number" />
                <input type="email" placeholder="E-mail" />
                <textarea placeholder="Your message"></textarea>
                <label className="checkboxLabel">
                  <input type="checkbox" />
                  I agree to the processing of personal data.
                </label>
                <button className="submitBtn" type="submit">
                  <FaPaperPlane />Submit
                </button>
              </form>
            </div> */}
             <div>
           
            <ChatBox propertyId={propertyItem.id} userId={userIdFromStore} propertyUserId={propertyItem.userId} />
        </div>

            {/* Owner Profile */}
            <div className="ownerProfile">
              <img src={userData.img} alt={userData.name} className="ownerImage" />
              <h4>Owner: {userData.name}</h4>
              <p>{userData.contact}</p>
              <a href={`mailto:${userData.email}`}>{userData.email}</a>
              <a href="#" className="viewProfile">View broker profile</a>
            </div>
          </div>
        </div>
        {/* <div className="mapSection">
                
              </div> */}
      </div>
      <Footer showExtra={true} />
      
    </div>
  );
};

export default PropertyDetails;



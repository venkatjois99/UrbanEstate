import { singlePostData } from '../../../assets/dummyData/dummyData';
import { FaRupeeSign, FaPhone, FaHeart, FaPaperPlane, FaStar, FaCalendarAlt, FaBed, FaChair } from 'react-icons/fa'; // for rupee sign
import { userData } from '../../../assets/dummyData/dummyData';
import Slider from '../../additional-Components/ImageSlider/slider';
import NavBars from '../../header/header';
import Footer from '../../footer/footer';
import './propertyDetails.css'
import MyMap from '../../map/myMap';

const PropertyDetails = () => {
    return (
       <>
       <NavBars/>
        <div className="singlePage">
          {/* Image Slider */}
          <div className="imageSection">
            <Slider images={singlePostData.images} />
          </div>
    
          {/* Container for Info and Right Section */}
          <div className="contentContainer">
            {/* Info Section */}
            <div className="infoSection">
              <div className="topSection">
                <div className="titleRatingSection">
                  <h1>{singlePostData.title}</h1>
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < singlePostData.rating ? "star filled" : "star"}
                      />
                    ))}
                    <span>
                      {singlePostData.rating} ({singlePostData.reviews}+)
                    </span>
                  </div>
                </div>
    
                <div className="priceIconContainer">
                  <div className="priceSection">
                    <FaRupeeSign />
                    <span className="price">{singlePostData.price}</span>
                  </div>
    
                  <div className="iconSection">
                  <div className="iconItem">
                  <FaCalendarAlt /> <span>Posted Date: {singlePostData.date}</span>
                    </div>
                    <div className="iconItem">
                    <FaBed /> <span>{singlePostData.bhk}-BHK</span>
                    </div>
                    <div className="iconItem">
                      <FaChair /> <span>{singlePostData.status}</span>
                    </div>
                    {/* <div className="iconItem">
                      <MdAccountBalance />{" "}
                      <span>
                        {singlePostData.depositRequired ? "Deposit required" : "No deposit"}
                      </span>
                    </div> */}
                  </div>
                </div>
    
                <p className="address">{singlePostData.address}</p>
                <p className="description">{singlePostData.description}</p>
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
              <div className="contactOwner">
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
        <Footer/>
       </>
      );
    };
    
    export default PropertyDetails;



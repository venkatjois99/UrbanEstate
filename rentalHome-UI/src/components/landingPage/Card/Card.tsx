import './Card.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { ApartmentItem } from "../../../assets/dummyData/dummyData";

 

interface CardProps {
    item: ApartmentItem;
}

const LandingPageCard: React.FC<CardProps> = ({ item }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite);
    };

    const handleGetOwnerDetails = () => {
        alert(`Fetching owner details for ${item.title}`);
        // You can integrate the actual functionality for fetching owner details here
    };
    // <Link to={`/single/${item.id}`}>
    //          </Link>
    return (
        <div className="landing-card">
            <div className="landing-card-imageContainer">
          
                    <img className='property-image' src={item.img} alt={item.title} />
                    <div className='land-card-location'><img src='src/assets/icons/landing-location-logo.svg' width={20} height={20}/>{item.address}</div>
           
                {/* Favorite Icon inside the image
                <div className="favIcon" onClick={handleFavoriteClick}>
                    <FontAwesomeIcon
                        icon={faHeart}
                        style={{ color: isFavorite ? '#31a6f5' : 'white' }}
                    />
                </div> */}
            </div>
            <div className="landing-card-textContainer">
                <h6 className="land-card-title">
                  {item.title}
                </h6>
                <p className="land-card-item">
                    {item.address}
                </p>
               <div className='d-flex'> <p className="land-card-price">₹{item.price}</p>
                <Link className='ms-auto' to={`/single/${item.id}`}> <img  src='src/assets/icons/footerSearchArrow.svg'></img>
                       </Link> 
               </div>
               
                </div>
            </div>
            
        );
};

export default LandingPageCard;

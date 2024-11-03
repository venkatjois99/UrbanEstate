import './Card.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { ApartmentItem } from "../../../assets/dummyData/dummyData";
import { Property } from "../../../models/propertyModel";
import { useNavigate } from 'react-router-dom';



interface CardProps {
    item: Property;
}

const LandingPageCard: React.FC<CardProps> = ({ item }) => {
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate(`/single/${item.id}`, { state: { property: item } }); // Navigate with state
      };
    return (
        <div className="landing-card">
            <div className="landing-card-imageContainer">

                {item.images?.slice(0, 1).map((image, index) => (
                    <img key={index} className='property-image' src={image} alt={item.title} />
                ))}                    <div className='land-card-location'><img src='src/assets/icons/landing-location-logo.svg' width={20} height={20} />{item.location}</div>

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
                <div className='d-flex'> <p className="land-card-price">₹{item.rent}</p>
                    <img src='src/assets/icons/footerSearchArrow.svg' onClick={handleCardClick} className='ms-auto'></img>
                </div>

            </div>
        </div>

    );
};

export default LandingPageCard;

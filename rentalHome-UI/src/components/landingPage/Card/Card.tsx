import './Card.css';
import React from 'react';
import { Property } from "../../../models/propertyModel";
import { useNavigate } from 'react-router-dom';



interface CardProps {
    item: Property;
    small: boolean;
}

const LandingPageCard: React.FC<CardProps> = ({ item, small }) => {
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate(`/single/${item.id}`, { state: { property: item } }); // Navigate with state
    };
    return (
        <div className={`landing-card ${small ? 'small' : ''}`}>
            <div className="landing-card-imageContainer">

                {item.images?.slice(0, 1).map((image, index) => (
                    <img key={index} className='property-image' src={image} alt={item.title} />
                ))}                    {!small && ( <div className='land-card-location'><img src='src/assets/icons/landing-location-logo.svg' width={20} height={20} />{item.location}</div>)}

            </div>
            <div className="landing-card-textContainer">
                <h6 className="land-card-title">
                    {small ? item.title.slice(0,10)+"..":item.title}
                </h6>
                    {small ? item.propertyType : ""}
                {!small && (
                    <p className="land-card-item">
                        {item.address}
                    </p>
                )}
                <div className='d-flex'> <p className="land-card-price">₹{item.rent}</p>
                    <img src='src/assets/icons/footerSearchArrow.svg' onClick={handleCardClick} className='ms-auto clickable-Icon' ></img>
                </div>

            </div>
        </div>

    );
};

export default LandingPageCard;

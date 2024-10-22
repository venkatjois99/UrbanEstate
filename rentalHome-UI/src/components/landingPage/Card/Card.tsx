import './Card.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

interface ApartmentItem {
    id: number;
    title: string;
    img: string;
    bedRooms: number;
    bathRooms: number;
    price: number;
    address: string;
}

interface CardProps {
    item: ApartmentItem;
}

const Card: React.FC<CardProps> = ({ item }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite);
    };

    const handleGetOwnerDetails = () => {
        alert(`Fetching owner details for ${item.title}`);
        // You can integrate the actual functionality for fetching owner details here
    };

    return (
        <div className="card">
            <div className="imageContainer">
                <Link to={`/single/${item.id}`}>
                    <img src={item.img} alt={item.title} />
                </Link>
                {/* Favorite Icon inside the image */}
                <div className="favIcon" onClick={handleFavoriteClick}>
                    <FontAwesomeIcon
                        icon={faHeart}
                        style={{ color: isFavorite ? '#31a6f5' : 'white' }}
                    />
                </div>
            </div>
            <div className="textContainer">
                <h2 className="title">
                    <Link to={`/single/${item.id}`}>{item.title}</Link>
                </h2>
                <p className="address">
                    <span>{item.address}</span>
                </p>
                <p className="price">${item.price}</p>
                <div className="bottom">
                    <div className="features">
                        <div className="feature">
                            <span>{item.bedRooms} bedroom{item.bedRooms > 1 ? 's' : ''}</span>
                        </div>
                        <div className="feature">
                            <span>{item.bathRooms} bathroom{item.bathRooms > 1 ? 's' : ''}</span>
                        </div>
                    </div>
                    {/* Get Owner Details Button */}
                    <div className="getOwnerDetails">
                        <button onClick={handleGetOwnerDetails}>Get Owner Details</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;

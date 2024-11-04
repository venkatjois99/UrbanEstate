import "./listPageCard.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faHome,faGenderless,faUsers } from "@fortawesome/free-solid-svg-icons";
import { faChair } from "@fortawesome/free-solid-svg-icons/faChair";
import FavoriteIcon from "../../../assets/icons/favouriteIcon";
import { Property } from "../../../models/propertyModel";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch,RootState } from "../../../store/myAppStore";
import {fetchFavoritesThunk,removeFavoriteThunk,addFavoriteThunk} from "../../../RentalServices/Slicer/Favourites/favouriteThunk"

interface CardProps {
  item: Property;
  extraShow:boolean;
}

const ListPageCard: React.FC<CardProps> = ({ item,extraShow }) => {
  const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const userIdFromStore = useSelector((state: RootState) => state.user.userId);
    const favorites = useSelector((state: RootState) => state.favourites.favorites);
    
    // Check if the current property is a favorite
    const isFavorite = favorites.includes(item.id);

    // Fetch favorites when the component mounts or when the user ID changes
    useEffect(() => {
        if (userIdFromStore) {
            dispatch(fetchFavoritesThunk(userIdFromStore));
        }
    }, [userIdFromStore, dispatch]);

    // Handle adding or removing favorites
    const handleFavoriteClick = (event: React.MouseEvent) => {
      event.stopPropagation();
      console.log("clicked",userIdFromStore);
        if (!userIdFromStore) return;

        if (isFavorite) {
            dispatch(removeFavoriteThunk({ userId: userIdFromStore, propertyId: item.id }));
        } else {
            dispatch(addFavoriteThunk({ userId: userIdFromStore, propertyId: item.id }));
        }
    };

  const handleCardClick = () => {
    navigate(`/single/${item.id}`, { state: { property: item } }); // Navigate with state
  };

  return (
    <div className="listpage-cards-cont">
      
      <div className="listpage-card" onClick={handleCardClick}  style={{ cursor: 'pointer' }}>
       <div key={item.id} className="list-page-card-holder">
       <div className="list-card-image-container">
       <img src={item.images ? item.images[0] : 'default-image.jpg'} className="list-img-holder" alt={item.title} />         
        </div>
        <div className="card-info-cont">
          <h5>{item.title}</h5>
          <p>{item.location}</p>
          <p>{item.description}</p>
          <h5>₹{item.rent}</h5>
        </div>
       </div>
        {extraShow && <div className="d-flex flex-column gap-3 additonal-info">
          <p>
    <FontAwesomeIcon icon={faHome} color="#216B9B" />
    {item.propertyType === 'apartment' || item.propertyType === 'house' ? item.bhkType : 
     item.propertyType === 'pg' ?` ${item.pgSharingType} sharing` : 
     item.propertyType === 'flatmates' ? item.sharedBedrooms : ''}
  </p>       <p>
 
  {item.propertyType === 'apartment' || item.propertyType === 'house' ?<> <FontAwesomeIcon icon={faChair} color="#216B9B" /> {item.furnishing} </> : ''} 
  {item.propertyType === 'pg'  ? <><FontAwesomeIcon icon={faUsers} color="#216B9B"/> {item.pgLivingType}</> : ''} 
{item.propertyType === 'flatmates' ? <><FontAwesomeIcon icon={faUsers} color="#216B9B"/> {item.preferredFlatmate} </>:''}
</p>
        <p><FontAwesomeIcon icon={faCalendarAlt} color="#216B9B" /> {item.postingDate.slice(0, item.postingDate.indexOf('T'))}</p>
          </div>}
          <FavoriteIcon onIconClick={handleFavoriteClick} isFavorited={isFavorite} className="favourite-icon" />
      </div>
  </div>
  );
};

export default ListPageCard;

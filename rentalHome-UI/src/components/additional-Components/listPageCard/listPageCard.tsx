import "./listPageCard.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faHome,faGenderless,faUsers } from "@fortawesome/free-solid-svg-icons";
import ApartmentItem from "../../../models/listCardModel";
import { faChair } from "@fortawesome/free-solid-svg-icons/faChair";
import FavoriteIcon from "../../../assets/icons/favouriteIcon";
import { Property } from "../../../models/propertyModel";



interface CardProps {
  item: Property;
  extraShow:boolean;
}

const ListPageCard: React.FC<CardProps> = ({ item,extraShow }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="listpage-cards-cont">
      <div key={item.id} className="listpage-card">
       <div className="list-page-card-holder">
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
          <FavoriteIcon onIconClick={handleFavoriteClick} isFavorited={isFavorite} />
      </div>
  </div>
  );
};

export default ListPageCard;

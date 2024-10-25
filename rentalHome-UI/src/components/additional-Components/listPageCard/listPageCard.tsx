import "./listPageCard.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faHome } from "@fortawesome/free-solid-svg-icons";
import ApartmentItem from "../../../models/listCardModel";
import { faChair } from "@fortawesome/free-solid-svg-icons/faChair";
import FavoriteIcon from "../../../assets/icons/favouriteIcon";



interface CardProps {
  item: ApartmentItem;
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
          <img src={item.img} className="list-img-holder" alt={item.name}></img>
         
        </div>
        <div className="card-info-cont">
          <h5>{item.name}</h5>
          <p>{item.address}</p>
          <p>{item.description}</p>
          <h5>₹{item.price}</h5>
        </div>
       </div>
        {extraShow && <div className="d-flex flex-column gap-3 additonal-info">
        <p><FontAwesomeIcon icon={faHome} color="#216B9B" /> 3 BHK</p>
        <p><FontAwesomeIcon icon={faChair} color="#216B9B" /> Semi-furnished</p>
        <p><FontAwesomeIcon icon={faCalendarAlt} color="#216B9B" /> Posted On</p>
       
          </div>}
          <FavoriteIcon onIconClick={handleFavoriteClick} isFavorited={isFavorite} />
      </div>
  </div>
  );
};

export default ListPageCard;

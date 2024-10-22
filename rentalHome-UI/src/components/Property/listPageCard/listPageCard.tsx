import "./listPageCard.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import ApartmentItem from "../../../models/listCardModel";



interface CardProps {
  item: ApartmentItem[];
}

const ListPageCard: React.FC<CardProps> = ({ item }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="listpage-cards-cont">
    {item.map((apartment) => (
      <div key={apartment.id} className="listpage-card">
        <div className="image-container">
          <img src={apartment.img} className="list-img-holder" alt={apartment.name}></img>
         
        </div>
        <div className="card-info-cont">
          <h6>{apartment.name}</h6>
          <p>{apartment.address}</p>
          <p>{apartment.description}</p>
          <h5>${apartment.price}</h5>
        </div>
      </div>
    ))}
  </div>
  );
};

export default ListPageCard;

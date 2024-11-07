import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import './commentCard.css';

interface CommentCardProps {
  name: string;
  location: string;
  comment: string;
  // profileImage: string; // Added prop for profile image
  rating: number; // Added prop for rating
}

const CommentCard: React.FC<CommentCardProps> = ({ name, location, comment, rating }) => {
  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => <FaStar key={`full-${i}`} className="comment-card-star" />)}
        {hasHalfStar && <FaStarHalfAlt className="comment-card-star" />}
        {[...Array(emptyStars)].map((_, i) => <FaRegStar key={`empty-${i}`} className="comment-card-star" />)}
      </>
    );
  };

  return (
    <div className="comment-card">
      <div className="comment-card-profile">
        {/* <img src={profileImage} alt={name} className="comment-card-profile-image" /> */}
        <div className="comment-card-profile-info">
          <h4>{name}</h4>
          <p>{location}</p>
        </div>
      </div>
      <div className="comment-card-rating">{renderStars()}</div>
      <p className="comment-card-comment">{comment}</p>
    </div>
  );
};

export default CommentCard;
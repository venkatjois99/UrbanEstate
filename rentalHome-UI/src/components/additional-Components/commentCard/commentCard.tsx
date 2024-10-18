import React from 'react';
import "./commentCard.css"

interface CommentCardProps {
  name: string;
  location: string;
  comment: string;
}

const CommentCard: React.FC<CommentCardProps> = ({ name, location, comment }) => {
  return (
    <div className="comment-card">
      <h4>{name}</h4>
      <p>{location}</p>
      <p>{comment}</p>
    </div>
  );
};

export default CommentCard;
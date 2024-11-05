import React, { useState } from 'react';
import './RateUs.css';

const RateUs: React.FC = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");

  const handleRatingSubmit = async () => {
    // Submit the rating to the backend
    await fetch('/api/rate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating, feedback }),
    });

    alert("Thank you for your feedback!");
    setRating(null);
    setFeedback("");
  };

  return (
    <div className="rate-us-container">
      <h3>Rate Us</h3>
      <div className="feedback-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${rating && rating >= star ? 'gold' : ''}`}
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
      </div>
      <textarea
        className="feedback-input"
        placeholder="Leave your feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <button className="feedback-submit-button" onClick={handleRatingSubmit}>
        Submit
      </button>
    </div>
  );
};

export default RateUs;

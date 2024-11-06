import React, { useState } from 'react';
import './RateUs.css';
import { submitFeedback } from '../../RentalServices/Services/feedbackService';

const RateUs: React.FC = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [feedbackText, setFeedbackText] = useState("");

  const handleRatingSubmit = async () => {
    if (!rating) {
      alert("Please select a rating before submitting!");
      return;
    }

    try {
      await submitFeedback({ rating, feedbackText }); // Call the service function
      alert("Thank you for your feedback!");
      setRating(null);
      setFeedbackText("");
    } catch (error: any) {
      alert(error.message || "An error occurred. Please try again.");
    }
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
        value={feedbackText}
        onChange={(e) => setFeedbackText(e.target.value)}
        maxLength={200} // Limit input to 200 characters to match the backend model
      />
      <button
        className="feedback-submit-button"
        onClick={handleRatingSubmit}
        disabled={!rating}
      >
        Submit
      </button>
    </div>
  );
};

export default RateUs;

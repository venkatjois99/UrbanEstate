import React, { useState,useEffect } from 'react';
import './RateUs.css';
import { submitFeedback } from '../../RentalServices/Services/feedbackService';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetailsById } from '../../RentalServices/Slicer/user/userThunk'; // Import your thunk
import { RootState,AppDispatch } from '../../store/myAppStore'; 

  const RateUs: React.FC = () => {
    const [rating, setRating] = useState<number | null>(null);
    const [feedbackText, setFeedbackText] = useState('');
    const [location, setLocation] = useState('');
    const userIdFromStore = useSelector((state: RootState) => state.user.userId); // Get userId from Redux store
    const { userDetails } = useSelector((state: RootState) => state.user); // Get userDetails
  
    const dispatch = useDispatch<AppDispatch>();
  
    useEffect(() => {
      // Fetch user details if userIdFromStore is available
      if (userIdFromStore) {
        dispatch(getUserDetailsById(userIdFromStore));
      }
    }, [dispatch, userIdFromStore]);
  
    const handleRatingSubmit = async () => {
      if (!rating || !location) {
        alert('Please select a rating and provide your location before submitting!');
        return;
      }
  
      // Check if userDetails is available (userName)
      const userName = userDetails?.userName || 'Anonymous'; // Default to 'Anonymous' if userDetails is not available
  
      const feedback = {
        userId: userIdFromStore as string,
        rating,
        feedbackText,
        userName,
        location,
      };
  
      try {
        console.log(feedback)
        await submitFeedback(feedback); // Call the service function
        alert('Thank you for your feedback!');
        setRating(null);
        setFeedbackText('');
        setLocation('');
      } catch (error: any) {
        alert(error.message || 'An error occurred. Please try again.');
      }
    };
  
    return (
      <div className="rate-us-container">
        <h3>Rate Us</h3>
  
        {/* Location Input */}
        <div className="location-input">
          <input
            type="text"
            className="location-field"
            placeholder="Enter your location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
  
        {/* Star Rating */}
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
  
        {/* Feedback Textarea */}
        <textarea
          className="feedback-input"
          placeholder="Leave your feedback"
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          maxLength={200} // Limit input to 200 characters to match the backend model
        />
  
        {/* Submit Button */}
        <button
          className="feedback-submit-button"
          onClick={handleRatingSubmit}
          disabled={!rating || !location}
        >
          Submit
        </button>
      </div>
    );
  };
  
  export default RateUs;

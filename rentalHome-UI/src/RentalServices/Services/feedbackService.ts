import axios from 'axios';
import {FeedbackPostModel} from '../../models/feedbackModel';

const API_BASE_URL = 'https://localhost:8080/gateway/Feedback';

// Function to submit feedback
export const submitFeedback = async (feedback: FeedbackPostModel) => {
  try {
    const response = await axios.post(API_BASE_URL,feedback)
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data || 'Failed to submit feedback');
    } else {
      throw new Error('An error occurred. Please try again.');
    }
  }
};

export const getFeedbacks = async () => {
  try {
    const response = await axios.get(API_BASE_URL)
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data || 'Failed to fetch feedback');
    } else {
      throw new Error('An error occurred. Please try again.');
    }
  }
};
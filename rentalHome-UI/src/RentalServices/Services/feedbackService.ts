import axios from 'axios';

interface FeedbackData {
  rating: number;
  feedbackText: string;
}

const API_BASE_URL = '/api/feedback'; // Update with full URL if necessary, e.g., http://localhost:5000/api/feedback

// Function to submit feedback
export const submitFeedback = async (data: FeedbackData) => {
  try {
    const response = await axios.post(API_BASE_URL, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data || 'Failed to submit feedback');
    } else {
      throw new Error('An error occurred. Please try again.');
    }
  }
};

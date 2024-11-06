// propertyService.ts
import axios from 'axios';
import { PostProperty } from '../../models/postPropertyModel';
import { Property } from '../../models/propertyModel';

const API_URL = 'https://localhost:8080/gateway/Property';

export const createPropertyService = async (property: PostProperty) => {
  const response = await axios.post(`${API_URL}`, property);
  console.log(response);
  return response.data; // Return the created property data
};

export const getPropertyService = async ()=>{
    const res = await axios.get(`${API_URL}`);
    
    return res.data;
}
export const updatePropertyService = async (property: Property) => {
  const response = await axios.put(`${API_URL}/${property.id}`, property);
  console.log(response);
  return response.data; // Return the created property data
};
// In your propertyService.ts file (or wherever you're handling API calls)



// Define the delete service function
export const deletePropertyService = async (propertyId: number): Promise<void> => {
  try {
    // Send the DELETE request to the API with the property ID
    const response = await axios.delete(`${API_URL}/${propertyId}`);
    
    console.log(response); // Optionally log the response for debugging
    
    // If needed, you can return some kind of success message or the response data
    return response.data;  // You can return something if your backend sends a response
  } catch (error) {
    console.error("Error deleting property:", error);
    throw error; // Propagate the error so it can be handled in the thunk or component
  }
};


// propertyService.ts
import axios from 'axios';
import { PostProperty } from '../../models/postPropertyModel';

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
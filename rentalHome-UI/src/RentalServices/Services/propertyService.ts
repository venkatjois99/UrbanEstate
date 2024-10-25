// propertyService.ts
import axios from 'axios';
import { Property } from '../../models/propertyModel';

const API_URL = 'url';

export const createPropertyService = async (property: Property) => {
  const response = await axios.post("https://localhost:7104/api/Property", property);
  return response.data; // Return the created property data
};

export const getPropertyService = async ()=>{
    const res = await axios.get("https://localhost:7104/api/Property");
    return res.data;
}
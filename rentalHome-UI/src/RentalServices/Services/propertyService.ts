// propertyService.ts
import axios from 'axios';
import { Property } from '../../models/propertyModel';

const API_URL = 'url';

export const createPropertyService = async (property: Property) => {
  const response = await axios.post(API_URL, property);
  return response.data; // Return the created property data
};

export const getPropertyService = async ()=>{
    const res = await axios.get("");
    return res.data;
}
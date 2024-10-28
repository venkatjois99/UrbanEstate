// propertyService.ts
import axios from 'axios';
import { PostProperty } from '../../models/postPropertyModel';

const API_URL = 'url';

export const createPropertyService = async (property: PostProperty) => {
  const response = await axios.post("https://localhost:7104/api/Property", property);
  console.log(response)
  return response.data; // Return the created property data
};

export const getPropertyService = async ()=>{
    const res = await axios.get("https://localhost:7104/api/Property");
    return res.data;
}
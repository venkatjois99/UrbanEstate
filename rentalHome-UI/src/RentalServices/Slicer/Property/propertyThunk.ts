import { createAsyncThunk } from "@reduxjs/toolkit";
import { Property } from "../../../models/propertyModel";
import { createPropertyService, getPropertyService } from "../../Services/propertyService";

export const createPropertyThunk = createAsyncThunk<Property,Property>(
    'property/createPropertyThunk',
    async (propertyData) => {
      const response = await createPropertyService(propertyData);
      return response.data;
    }
  );

  export const getPropertiesThunk = createAsyncThunk(
    'property/getPropertiesThunk',
    async () =>{
        const res = await getPropertyService();
        return res;
        
    }
  )
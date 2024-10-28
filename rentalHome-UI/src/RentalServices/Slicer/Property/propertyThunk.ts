import { createAsyncThunk } from "@reduxjs/toolkit";
import { PostProperty } from "../../../models/postPropertyModel";
import { createPropertyService, getPropertyService } from "../../Services/propertyService";

export const createPropertyThunk = createAsyncThunk<PostProperty,PostProperty>(
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
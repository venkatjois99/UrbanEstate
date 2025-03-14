import { createAsyncThunk } from "@reduxjs/toolkit";
import { PostProperty } from "../../../models/postPropertyModel";
import { Property } from "../../../models/propertyModel";
import { createPropertyService, getPropertyService,updatePropertyService,deletePropertyService } from "../../Services/propertyService";

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
  export const updatePropertyThunk = createAsyncThunk<Property, Property>(
    'property/updatePropertyThunk',
    async (propertyData) => {
      const response = await updatePropertyService(propertyData);
      // console.log(response) // Call your update service
      return response; // Return the updated property data
    }
  );
  export const deletePropertyThunk = createAsyncThunk<void, number>(
  'property/deletePropertyThunk',
  async (propertyId) => {
    await deletePropertyService(propertyId); // Call the service to delete the property
    return; // Return nothing because we just need to signal the deletion
  }
);
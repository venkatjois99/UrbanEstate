// slices/propertySlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { Property } from '../../../models/propertyModel'; // Import the Property model
import { createPropertyThunk, getPropertiesThunk,updatePropertyThunk } from './propertyThunk';

interface PropertyState {
    properties: Property[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: PropertyState = {
    properties: [],
    loading: false,
    error: null,
  };
  
  const propertySlicer = createSlice({
    name: 'property',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(createPropertyThunk.pending, (state) => {
          state.loading = true;
        })
        .addCase(createPropertyThunk.fulfilled, (state, action) => {
          state.loading = false;
          // state.properties.push(action.payload); // Add the created property to the list
        })
        .addCase(createPropertyThunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to create property';
        })
        .addCase(getPropertiesThunk.pending, (state) => {
          state.loading = true; // Set loading to true while fetching
        })
        .addCase(getPropertiesThunk.fulfilled, (state, action) => {
          state.loading = false;
          state.properties = action.payload; // Store the fetched properties
        })
        .addCase(getPropertiesThunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to fetch properties';
        })
        .addCase(updatePropertyThunk.pending, (state) => {
          state.loading = true;
        })
        .addCase(updatePropertyThunk.fulfilled, (state, action) => {
          state.loading = false;
          // Find the updated property and replace it in the state
          const index = state.properties.findIndex(
            (property) => property.id === action.payload.id
          );
          if (index !== -1) {
            state.properties[index] = action.payload; // Update the property in the list
          }
        })
        .addCase(updatePropertyThunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to update property';
        });
    },
  });

export default propertySlicer.reducer;

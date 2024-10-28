// slices/propertySlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { Property } from '../../../models/propertyModel'; // Import the Property model
import { createPropertyThunk, getPropertiesThunk } from './propertyThunk';

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
        });
    },
  });

export default propertySlicer.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { fetchFavoritesThunk, addFavoriteThunk,removeFavoriteThunk } from './favouriteThunk';


interface FavouritesState {
    favorites: number[]; // Array of property IDs
    loading: boolean;
    error: string | null;
}

const initialState: FavouritesState = {
    favorites: [],
    loading: false,
    error: null,
};


const favouritesSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavoritesThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFavoritesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.favorites = action.payload;
            })
            .addCase(fetchFavoritesThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch favorites';
            })
            .addCase(addFavoriteThunk.fulfilled, (state, action) => {
                // Update the favorites list to include the new favorite
                state.favorites.push(action.payload); // action.payload is the propertyId
            })
            .addCase(removeFavoriteThunk.fulfilled, (state, action) => {
                // Remove the favorite from the list
                state.favorites = state.favorites.filter(id => id !== action.payload); // action.payload is the propertyId
            });
    },
});

export default favouritesSlice.reducer;

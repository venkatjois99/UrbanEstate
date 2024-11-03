import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFavoritesService, addFavoriteService, removeFavoriteService } from "../../Services/favouritesService";

export const fetchFavoritesThunk = createAsyncThunk<number[], string>(
    'favourites/fetchFavorites',
    async (userId) => {
        const response = await fetchFavoritesService(userId);
        return response; // Assuming it returns an array of favorite property IDs
    }
);

export const addFavoriteThunk = createAsyncThunk<number, { userId: string; propertyId: number }>(
    'favourites/addFavorite',
    async ({ userId, propertyId }) => {
        await addFavoriteService(userId, propertyId);
        return propertyId; // Return the propertyId to update the state
    }
);

export const removeFavoriteThunk = createAsyncThunk<number, { userId: string; propertyId: number }>(
    'favourites/removeFavorite',
    async ({ userId, propertyId }) => {
        await removeFavoriteService(userId, propertyId);
        return propertyId; // Return the propertyId to update the state
    }
);

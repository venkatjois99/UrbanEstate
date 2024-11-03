import axios from 'axios';

const fav_url = 'https://localhost:8080/gateway/Favourites';

export const fetchFavoritesService = async (userId: string): Promise<number[]> => {
    const response = await axios.get(`${fav_url}/${userId}`);
    return response.data; // Assumes the response is an array of property IDs
};

export const addFavoriteService = async (userId: string, propertyId: number) => {
    await axios.post(fav_url, { userId, propertyId });
};

export const removeFavoriteService = async (userId: string, propertyId: number) => {
    await axios.delete(fav_url, { data: { userId, propertyId } });
};

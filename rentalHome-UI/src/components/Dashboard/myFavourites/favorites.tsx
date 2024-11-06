// pages/Favorites.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../../store/myAppStore";
import { fetchFavoritesThunk } from "../../../RentalServices/Slicer/Favourites/favouriteThunk"
import { getPropertiesThunk } from "../../../RentalServices/Slicer/Property/propertyThunk"
import { Property } from "../../../models/propertyModel";
import ListPageCard from "../../additional-Components/listPageCard/listPageCard";


const Favorites: React.FC = () => {
  // const [favorites, setFavorites] = useState<number[]>([]); // Set type here
  const dispatch = useDispatch<AppDispatch>();
  const userIdFromStore = useSelector((state: RootState) => state.user.userId);
  const favorites = useSelector((state: RootState) => state.favourites.favorites);
  const properties: Property[] = useSelector((state: RootState) => state.property.properties);
  const myFavourites = properties.filter((property) => favorites.includes(property.id));
  useEffect(() => {
    if (userIdFromStore) {
      dispatch(fetchFavoritesThunk(userIdFromStore));
    }
  }, [userIdFromStore, dispatch]);
  useEffect(() => {
    
    dispatch(getPropertiesThunk());
  }, [dispatch]);
  if(favorites.length == 0){
    return <div>No Favourites</div>;
  }
  if (!properties.length || !favorites.length) {
    return <div>Loading your favorites...</div>;
  }
  return (
    <div className=' d-flex flex-column gap-2'>
      <h3>My Favorite Properties</h3>
      {myFavourites.map((property) => (
        <div key={property.id}>
            <ListPageCard item={property} extraShow={true} />
        </div>
      ))}
    </div>
  );
};

export default Favorites;

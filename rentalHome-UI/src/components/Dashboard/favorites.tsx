// pages/Favorites.tsx
import React, { useState, useEffect } from 'react';

interface FavoriteProperty {
  id: number;
  name: string;
  location: string;
}

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoriteProperty[]>([]); // Set type here

  // useEffect(() => {
  //   // Fetch favorite properties from backend API
  //   const fetchFavorites = async () => {
  //     const response = await fetch('/api/favorites');
  //     const data: FavoriteProperty[] = await response.json(); // Type data as FavoriteProperty[]
  //     setFavorites(data);
  //   };

  //   fetchFavorites();
  // }, []);

  return (
    <div>
      <h3>My Favorite Properties</h3>
      <ul>
        {favorites.map((property) => (
          <li key={property.id}>
            <p>{property.name}</p>
            <p>{property.location}</p>
            <button>Remove from Favorites</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;

import "./listpage.css";
import SearchFilter from "../../additional-Components/SearchFilter/Filter";
import NavBars from "../../header/header";
import MyMap from "../../map/myMap";
import { LatLngExpression } from "leaflet";
import { useState } from "react";
import Footer from "../../footer/footer";
import ListPageCard from "../listPageCard/listPageCard";
import ApartmentItem from "../../../models/listCardModel";

// Define the type for each item in the list dat

const ListPage: React.FC = () => {
    const apartments: ApartmentItem[] = [
        {
          id: 1,
          name: "Sunny Side Apartments",
          img: "https://agoldbergphoto.com/wp-content/uploads/residential/Residential-13-scaled.jpg",
          price: 1500,
          address: "123 Sunshine Ave, Los Angeles, CA",
          description: "A cozy and well-lit apartment located in the heart of the city with stunning views of the skyline."
        },
        {
          id: 2,
          name: "Downtown Lofts",
          img: "https://cdn.architecturendesign.net/wp-content/uploads/2015/06/Estuary-Custom-4-13.jpg",
          price: 1800,
          address: "456 Market St, San Francisco, CA",
          description: "Modern lofts with open spaces, perfect for urban living in downtown San Francisco."
        },
        {
          id: 3,
          name: "Ocean Breeze Condos",
          img: "https://www.tollbrothers.com/blog/wp-content/uploads/2019/02/9-Solano-Bianca_Kitchen-to-Outdoor-Room.jpg",
          price: 2000,
          address: "789 Beachfront Blvd, Miami, FL",
          description: "Enjoy beachfront living with this spacious condo that offers breathtaking views of the ocean."
        },
        {
          id: 4,
          name: "Green Meadows Residences",
          img: "https://tse1.mm.bing.net/th/id/OIP.gvkzSak_14K1huytJQK8sgHaFj?rs=1&pid=ImgDetMain",
          price: 1300,
          address: "321 Maple St, Austin, TX",
          description: "Located in a peaceful suburb, these residences are perfect for families seeking a quiet neighborhood."
        },
        {
          id: 5,
          name: "Skyline Towers",
          img: "https://c8.alamy.com/comp/W4242J/modern-bedroom-door-entrance-with-lamps-and-pillows-beside-washroom-with-shower-area-glass-and-outside-garden-fence-with-gravel-and-green-plants-under-W4242J.jpg",
          price: 2500,
          address: "101 High Rise Rd, New York, NY",
          description: "Luxury apartments in the heart of the city with access to exclusive amenities and a rooftop garden."
        }
      ];

  const [mapCenter, setMapCenter] = useState<LatLngExpression | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>(""); // State for selected city

  const cityLocations: Record<string, LatLngExpression[]> = {
    Bangalore: [
      [12.9715987, 77.5945627], // Bangalore City Center
      [12.935192, 77.6244807], // Koramangala
      [12.914641935578215, 77.5565153360094],
      [12.849954307349948, 77.65718400475636],
      [13.0057, 76.096],
    ],
    Chennai: [
      [13.0827, 80.2707], // Chennai City Center
      [13.067439, 80.237617], // Anna Nagar
      [13.0825, 80.2705], // T Nagar
    ],
    Delhi: [
      [28.6139, 77.209], // Delhi City Center
      [28.7041, 77.1025], // New Delhi
      [28.5355, 77.391], // Noida
    ],
  };

  //   const handleCitySelect = (city: string) => {
  //     if (city && cityLocations[city]) {
  //       const locations = cityLocations[city];
  //       setMapCenter(locations[0]); // Focus on the first location of the selected city
  //       setSelectedCity(city); // Set the selected city
  //     } else {
  //       setMapCenter(null); // Reset the center if no city is selected
  //     }
  //   };

  return (
    <>
      <NavBars />
      <div className="listPage">
        <div className="listPage-search-list-cont">
          <div className="list-search-cont">
            <SearchFilter />
          </div>
       
            <ListPageCard item={apartments} />

        </div>
        <div className="list-map-cont">
          <MyMap
            positions={
              cityLocations[selectedCity] || cityLocations["Bangalore"]
            } // Use all locations of selected city
            center={mapCenter}
            allowSelection={false}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ListPage;

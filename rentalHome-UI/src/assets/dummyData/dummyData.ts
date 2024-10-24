// Define an interface for the apartment data
export interface Apartment {
    id: number;
    title: string;
    img: string;
    bedRooms: number;
    bathRooms: number;
    price: number;
    address: string;
    latitude: number;
    longitude: number;
}

// Create the data array with the type annotations
export const listData: Apartment[] = [
    {
        id: 1,
        title: "A Great Apartment Next to the Beach!",
        img: "https://images.pexels.com/photos/2598638/pexels-photo-2598638.jpeg?auto=compress&cs=tinysrgb&w=600",
        bedRooms: 2,
        bathRooms: 1,
        price: 1000,
        address: "456 Park Avenue, London",
        latitude: 51.5074,
        longitude: -0.1278,
    },
    {
        id: 2,
        title: "An Awesome Apartment Near Park!",
        img: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600",
        bedRooms: 3,
        bathRooms: 2,
        price: 1500,
        address: "789 Oxford Street, London",
        latitude: 52.4862,
        longitude: -1.8904,
    },
    {
        id: 3,
        title: "A New Apartment in the City",
        img: "https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=600",
        bedRooms: 1,
        bathRooms: 1,
        price: 800,
        address: "101 Baker Street, London",
        latitude: 53.4808,
        longitude: -2.2426,
    },
    {
        id: 4,
        title: "A Great Location, Great Price! Great Apartment",
        img: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600",
        bedRooms: 2,
        bathRooms: 1,
        price: 1000,
        address: "234 Kingsway, London",
        latitude: 53.8008,
        longitude: -1.5491,
    },
    {
        id: 5,
        title: "Apartment 5",
        img: "https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=600",
        bedRooms: 3,
        bathRooms: 2,
        price: 2000,
        address: "567 Victoria Road, London",
        latitude: 53.4084,
        longitude: -2.9916,
    },
    {
        id: 6,
        title: "A Great Apartment 6",
        img: "https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=600",
        bedRooms: 4,
        bathRooms: 2,
        price: 2500,
        address: "890 Regent Street, London",
        latitude: 54.9783,
        longitude: -1.6174,
    },
    {
        id: 7,
        title: "A Great Apartment 7",
        img: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=600",
        bedRooms: 2,
        bathRooms: 1,
        price: 1000,
        address: "112 Piccadilly, London",
        latitude: 53.3811,
        longitude: -1.4701,
    },
    {
        id: 8,
        title: "A Great Apartment 8",
        img: "https://images.pexels.com/photos/206172/pexels-photo-206172.jpeg?auto=compress&cs=tinysrgb&w=600",
        bedRooms: 3,
        bathRooms: 2,
        price: 1800,
        address: "8765 Main High Street, London",
        latitude: 51.4545,
        longitude: -2.5879,
    },
];

// Define interfaces for the data structure
export interface SinglePost {
    id: number;
    title: string;
    price: number;
    images: string[];
    bhk: number;
    rating:number;
    reviews:number;
    status:string;
    
    city: string;
    address: string;
    description: string;
    depositRequired:boolean;
    date:string;
    
}

export interface User {
    id: number;
    name: string;
    img: string;
    email:string;
    contact:string;
}

// Export singlePostData object with the defined type
export const singlePostData: SinglePost = {
    id: 1,
  title: "Estonia PG",
  price: 10000,
  images: [
    "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/210265/pexels-photo-210265.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/210265/pexels-photo-210265.jpeg?auto=compress&cs=tinysrgb&w=600",
  ],
  bhk: 2,
  city: "Bangalore",
  address: "Banasankari, Bangalore",
  description: " Looking for a perfect 2BHK house for rent? This spacious 2-bedroom, semi-furnished house is ideal for bachelors who are seeking a comfortable and hassle-free living experience. Located in a prime residential area, the house features a modern design with ample natural light, well-ventilated rooms, and a serene environment that ensures you feel at home. The kitchen is fully functional, and the living room offers plenty of space for relaxation or hosting friends.The owner is known to be calm and accommodating, providing a stress-free renting experience. What sets this house apart is the owner’s friendly attitude toward social gatherings. House parties are welcomed, making it an ideal place for those who like to socialize without any restrictions. You’ll have the freedom to enjoy your weekends with friends in the comfort of your own space.The locality is safe and well-connected to public transport, supermarkets, and eateries, making it convenient for your day-to-day needs. With a supportive owner and a lively atmosphere, this 2BHK is a perfect blend of comfort, convenience, and community for bachelors. Don’t miss the opportunity to make this your new home!",
  rating: 4.0,
  reviews: 100,
  status: "Semi Furnished",
  date:"2023-10-13",
  depositRequired: true,
};

// Export userData object with the defined type
export const userData: User = {
    id: 1,
  name: "Dheeraj",
  contact: "+91 1234567890",
  email: "dheeraj@realestate.es",
  img: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=600",
};


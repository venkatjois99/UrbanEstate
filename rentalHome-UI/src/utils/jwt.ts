// src/utils/jwt.ts
import { jwtDecode } from "c:/Users/VMAdmin/Desktop/RentalHome/rentalhome/rentalHome-UI/node_modules/jwt-decode/build/esm/index"

interface JwtToken {
    email: string;
    nameid: string;
    jti: string;
    role: string;
    nbf: number;
    exp: number;
    iat: number;
    iss: string;
    aud: string;
  }

export const getTokenData = (token: string | null) => {
  if (!token) return null;

  try {
    const decodedToken = jwtDecode<JwtToken>(token); // Use your defined interface
    console.log(decodedToken)
    // Check if the token is expired
    const isExpired = decodedToken.exp * 1000 < Date.now(); 

    if (isExpired) {
      return null; // Token is expired
    }

    return {
      id: decodedToken.nameid, // Use nameid for user ID
      role: decodedToken.role,   // Get the role
      exp:decodedToken.exp,
    };
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};


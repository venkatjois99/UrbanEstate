// models/Property.ts
export interface Property {
    id:number;
    userId:string;
    propertyType: string;
    title: string;
    location: string;
    address: string;
    rent: number;
    description: string;
    images?: string[];
    pgSharingType?: string; // Optional fields
    pgLivingType?: string;
    availableRooms?: number;
    sharingType?: string;
    sharedBedrooms?: number;
    furnishing?: string;
    preferredFlatmate?: string;
    bhkType?: string;
    postingDate: string;
    latitude?:number | null;
    longitude?:number | null;
  }
  
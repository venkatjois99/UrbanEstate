// models/Property.ts
export interface Property {
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
  }
  
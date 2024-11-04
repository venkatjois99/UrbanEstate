export interface Message {
    id: number;
    senderId: string | null;
    receiverId: string | null;
    propertyId: number;
    content: string;
    timestamp: string;
}

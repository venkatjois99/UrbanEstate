import axios from 'axios';
import { Message } from '../../models/messageModel';

const API_URL = 'https://localhost:8080/gateway/Messages';

// Function to fetch all chats for a specific user
export const getChats = async (userId: string | null): Promise<Message[]> => {
    try {
        const response = await fetch(`${API_URL}/mychats/${userId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

// Function to fetch messages between two users for a particular property
export const getMessages = async (propertyId: number, userId: string | null, propertyUserId: string): Promise<Message[]> => {
    try {
        const response = await axios.get<Message[]>(`${API_URL}/property/${propertyId}/${userId}/${propertyUserId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching messages:", error);
        throw error;
    }
};

// Function to send a new message
export const sendMessage = async (message: Message): Promise<Message> => {
    try {
        const response = await axios.post(API_URL, message);
        return response.data; // Assuming the response returns the saved message with an ID
    } catch (error) {
        console.error("Error sending message:", error);
        throw error;
    }
};

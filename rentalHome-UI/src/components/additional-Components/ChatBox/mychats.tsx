import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store/myAppStore";
import { initializeUserFromToken } from '../../../RentalServices/Slicer/user/userThunk';
import { Message } from '../../../models/messageModel';
import ChatBox from './chatBox'; // Import the ChatBox component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // Import the close icon
import './mychats.css'; // Import the CSS file

const MessageView: React.FC = () => {
    const [chats, setChats] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedChat, setSelectedChat] = useState<{ propertyId: number; userId: string; propertyUserId: string } | null>(null);
    
    const dispatch = useDispatch<AppDispatch>();
    const userIdFromStore = useSelector((state: RootState) => state.user.userId);

    useEffect(() => {
        dispatch(initializeUserFromToken());
    }, [dispatch]);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await fetch(`https://localhost:7031/api/Messages/mychats/${userIdFromStore}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setChats(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (userIdFromStore) {
            fetchChats();
        }
    }, [userIdFromStore]);

    // Group chats by senderId
    const groupedChats = chats.reduce((acc, chat) => {
        const senderId = chat.senderId || 'unknown'; // Fallback to 'unknown' if senderId is null
        if (!acc[senderId]) {
            acc[senderId] = [];
        }
        acc[senderId].push(chat);
        return acc;
    }, {} as Record<string, Message[]>);

    // Handle loading and error states
    if (loading) return <p>Loading chats...</p>;
    if (error) return <p>Error: {error}</p>;

    const handleUserClick = (propertyId: number, propertyUserId: string) => {
        setSelectedChat({ propertyId, userId: userIdFromStore!, propertyUserId });
    };

    const closeChat = () => {
        setSelectedChat(null);
    };

    return (
        <div className="message-view-container">
            <div className="chat-list-container">
                <h2>Your Chats</h2>
                {Object.keys(groupedChats).length === 0 ? (
                    <p>No chats available</p>
                ) : (
                    <div className="chat-list">
                        {Object.entries(groupedChats).map(([senderId]) => {
                            if (senderId === userIdFromStore) {
                                return null; // Skip this chat
                            }
                            return (
                                <div 
                                    key={senderId} 
                                    onClick={() => handleUserClick(groupedChats[senderId][0].propertyId, senderId)} 
                                    className="chat-item"
                                >
                                    <p>Chat with User ID: {senderId}</p>
                                    
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            {selectedChat && (
                <div className="chat-box-container">
                    <button className="close-button" onClick={closeChat} aria-label="Close Chat">
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <ChatBox 
                        propertyId={selectedChat.propertyId} 
                        userId={selectedChat.userId} 
                        propertyUserId={selectedChat.propertyUserId} 
                    />
                </div>
            )}
        </div>
    );
};

export default MessageView;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store/myAppStore";
import { initializeUserFromToken } from '../../../RentalServices/Slicer/user/userThunk';
import { Message } from '../../../models/messageModel';
import ChatBox from './chatBox'; // Import the ChatBox component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // Import the close icon
import './mychats.css'; // Import the CSS file
import { getChats } from '../../../RentalServices/Services/messageService'; // Import the new service functions

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
                if (userIdFromStore) {
                    const chatsData = await getChats(userIdFromStore); // Use the service to fetch chats
                    setChats(chatsData);
                }
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

    // Group chats by propertyId, then by senderId
    const groupedChats = chats.reduce((acc, chat) => {
        const { propertyId, senderId, senderName } = chat;
    
        // Skip chats with null senderId
        if (senderId === null) {
            return acc;
        }
    
        // Initialize the property group if it doesn't exist
        if (!acc[propertyId]) {
            acc[propertyId] = {};
        }
    
        // Initialize the sender group for that property if it doesn't exist
        if (!acc[propertyId][senderId]) {
            acc[propertyId][senderId] = {
                senderName: senderName || 'Unknown User',
                chats: [],
            };
        }
    
        // Push the chat into the corresponding group
        acc[propertyId][senderId].chats.push(chat);
    
        return acc;
    }, {} as Record<string, Record<string, { senderName: string; chats: Message[] }>>);
    

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
                        {Object.entries(groupedChats).map(([propertyId, senderGroups]) => {
                            return (
                                <div key={propertyId} className="property-group">
                                    <h3>Property {propertyId}</h3> {/* Display propertyId */}

                                    {/* Display sender groups within each property */}
                                    {Object.entries(senderGroups).map(
                                        ([senderId, { senderName, chats }]) => {
                                            // Skip chats where the sender is the current user
                                            if (senderId === userIdFromStore) {
                                                return null;
                                            }

                                            return (
                                                <div
                                                    key={senderId}
                                                    onClick={() =>
                                                        handleUserClick(
                                                            chats[0].propertyId,
                                                            senderId
                                                        )
                                                    }
                                                    className="chat-item"
                                                >
                                                    <p>Chat with {senderName}</p> {/* Display the senderName */}
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {selectedChat && (
                <div className="chat-box-container">
                    <button
                        className="close-button"
                        onClick={closeChat}
                        aria-label="Close Chat"
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <ChatBox
                        propertyId={selectedChat.propertyId}
                        propertyUserId={selectedChat.propertyUserId}
                    />
                </div>
            )}
        </div>
    );
};

export default MessageView;
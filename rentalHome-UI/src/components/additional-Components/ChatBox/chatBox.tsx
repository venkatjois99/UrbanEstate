import React, { useState, useEffect } from 'react';
import { Message } from '../../../models/messageModel';
import './chatBox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store/myAppStore";
import { getUserDetailsById, initializeUserFromToken } from '../../../RentalServices/Slicer/user/userThunk';
import { getMessages, sendMessage } from '../../../RentalServices/Services/messageService'; // Import the new service functions

interface ChatBoxProps {
    propertyId: number;
    propertyUserId: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ propertyId, propertyUserId }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageInput, setMessageInput] = useState<string>('');
    const [senderName, setSenderName] = useState<string | null>(null); // State for storing sender's name
    const dispatch = useDispatch<AppDispatch>();
    const userIdFromStore = useSelector((state: RootState) => state.user.userId);

    useEffect(() => {
        dispatch(initializeUserFromToken());
    }, [dispatch]);

    // Fetch sender's name when the component is mounted
    useEffect(() => {
        const fetchSenderName = async () => {
            try {
                if (userIdFromStore) {
                    const response = await dispatch(getUserDetailsById(userIdFromStore));
                    if (response.payload && response.payload.userName) {
                        setSenderName(response.payload.userName);
                    }
                    // console.log('Fetched sender name:', response.payload.userName);
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchSenderName();
    }, [dispatch, userIdFromStore]);

    useEffect(() => {
        // console.log(senderName);
        const fetchMessages = async () => {
            try {
                const messagesData = await getMessages(propertyId, userIdFromStore, propertyUserId);
                // console.log("Fetched messages:", messagesData);
                setMessages(messagesData);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };
        fetchMessages();
    }, [propertyId, userIdFromStore, propertyUserId]);

    const handleSendMessage = async () => {
        if (!senderName) {
            // console.log('Sender name is missing');
            return; // Prevent sending if senderName is empty
        }

        const newMessage: Message = {
            id: 0, // Temporary ID, will be set by the backend
            senderId: userIdFromStore,
            senderName: senderName, // Use the fetched sender name
            receiverId: propertyUserId,
            propertyId: propertyId,
            content: messageInput,
            timestamp: new Date().toISOString(), // Temporary timestamp
        };

        try {
            const sentMessage = await sendMessage(newMessage);
            setMessages(prev => [...prev, sentMessage]); // Optimistically add the new message
            setMessageInput(''); // Clear input field
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };
    // If the user is the same as the propertyUserId, return nothing (or show a message)
    if (userIdFromStore === propertyUserId) {
        return <></>; // Return an empty element if the users are the same
    }

    return (
        <div className="chat-container">
            <h5>Chat</h5>
            <div className="chat-box">
                {messages.map(msg => (
                    <div key={msg.id} className={`message ${msg.senderId === userIdFromStore ? 'sent' : 'received'}`}>
                        {msg.senderId === userIdFromStore ? (
                            <FontAwesomeIcon icon={faArrowUp} style={{ marginRight: '8px', color: '#007bff' }} />
                        ) : (
                            <FontAwesomeIcon icon={faArrowDown} style={{ marginRight: '8px', color: '#dc3545' }} />
                        )}
                        <div className="message-content">{msg.content}</div>
                        <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                    </div>
                ))}
            </div>
            <div className="mesinput-area">
                <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatBox;

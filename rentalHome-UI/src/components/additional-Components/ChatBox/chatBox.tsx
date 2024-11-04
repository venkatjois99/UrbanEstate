import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Message } from '../../../models/messageModel';
import './chatBox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector } from "react-redux";
import { RootState,AppDispatch } from "../../../store/myAppStore";
import { initializeUserFromToken } from '../../../RentalServices/Slicer/user/userThunk';

interface ChatBoxProps {
    propertyId: number;
    userId: string | null;
    propertyUserId: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ propertyId, userId, propertyUserId }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageInput, setMessageInput] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>();
    const userIdFromStore = useSelector((state: RootState) => state.user.userId);    
    useEffect(() => {
        dispatch(initializeUserFromToken());
    }, [dispatch]);
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get<Message[]>(`https://localhost:7031/api/messages/property/${propertyId}/${userId}/${propertyUserId}`);
                console.log("Fetched messages:", response.data);
                if (Array.isArray(response.data)) {
                    setMessages(response.data);
                } else {
                    console.error("Expected an array of messages, got:", response.data);
                }
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };
        fetchMessages();
    }, [propertyId, userId, propertyUserId]);

    const sendMessage = async () => {
        if (!messageInput.trim()) return;

        const newMessage: Message = {
            id: 0, // This will be set by the backend upon saving
            senderId: userId,
            receiverId: propertyUserId,
            propertyId: propertyId,
            content: messageInput,
            timestamp: new Date().toISOString() // Temporary timestamp
        };

        try {
            await axios.post('https://localhost:7031/api/Messages', newMessage);
            setMessages(prev => [...prev, { ...newMessage, id: messages.length + 1 }]); // Optimistically add the new message
            setMessageInput('');
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };
    console.log(userIdFromStore);
    console.log(propertyUserId);

    if (userIdFromStore === propertyUserId) {
        return (<></>); // or you can return a message instead
    }

    return (
        <div className="chat-container">
            <div className="chat-box">
                {messages.map(msg => (
                    <div key={msg.id} className={`message ${msg.senderId === userId ? 'sent' : 'received'}`}>
                        {msg.senderId === userId ? (
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
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatBox;

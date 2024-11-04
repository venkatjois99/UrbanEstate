import React, { useState } from 'react';
import AvatarSelector from './avatar';
import './Profile.css';
import { FaEdit } from 'react-icons/fa';
import NavBars from '../../header/header'

const Profile: React.FC = () => {
    const [avatar, setAvatar] = useState('https://randomuser.me/api/portraits/men/1.jpg');
    const [showAvatarSelector, setShowAvatarSelector] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        address: "123 Main St, Springfield, USA",
    });

    const toggleAvatarSelector = () => {
        setShowAvatarSelector(!showAvatarSelector);
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    return (
        <>
        <NavBars />
        <div className="profile-container">
            <div className="profile-header">
                <div className="avatar-container" onClick={toggleAvatarSelector}>
                    <img src={avatar} alt="Profile" className="profile-picture" />
                    <div className="edit-icon">
                        <FaEdit />
                    </div>
                </div>
                <h1>{user.name}</h1>
                <p>{user.email}</p>
            </div>
            {showAvatarSelector && <AvatarSelector onSelect={(selectedAvatar) => { 
                setAvatar(selectedAvatar); 
                setShowAvatarSelector(false); 
            }} />}
            <div className="profile-details">
                <h2>Contact Information</h2>
                {isEditing ? (
                    <div className="edit-form">
                        <input 
                            type="text" 
                            name="name" 
                            value={user.name} 
                            onChange={handleInputChange} 
                            placeholder="Name"
                        />
                        <input 
                            type="email" 
                            name="email" 
                            value={user.email} 
                            onChange={handleInputChange} 
                            placeholder="Email"
                        />
                        <input 
                            type="tel" 
                            name="phone" 
                            value={user.phone} 
                            onChange={handleInputChange} 
                            placeholder="Phone"
                        />
                        <textarea 
                            name="address" 
                            value={user.address} 
                            onChange={handleInputChange} 
                            placeholder="Address"
                        />
                        <button className="save-profile-button" onClick={handleEditToggle}>Save</button>
                    </div>
                ) : (
                    <>
                        <p><strong>Phone:</strong> {user.phone}</p>
                        <p><strong>Address:</strong> {user.address}</p>
                        <button className="edit-profile-button" onClick={handleEditToggle}>Edit Profile</button>
                    </>
                )}
            </div>
        </div>
        </>
    );
};

export default Profile;

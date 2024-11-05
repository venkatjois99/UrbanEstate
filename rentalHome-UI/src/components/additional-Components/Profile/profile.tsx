import React, { useEffect, useState } from 'react';
import AvatarSelector from './avatar';
import './Profile.css';
import { FaEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetailsById } from '../../../RentalServices/Slicer/user/userThunk'; // Import your thunk
import { RootState,AppDispatch } from '../../../store/myAppStore'; // Import RootState if needed
import { UserModelDTO } from '../../../models/registerUserModel';

const Profile: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    // Using RootState to type the selector properly
    const userIdFromStore = useSelector((state: RootState) => state.user.userId);
    const { userDetails, userDetailsStatus, userDetailsError } = useSelector((state: RootState) => state.user);
    
    const [avatar, setAvatar] = useState('https://randomuser.me/api/portraits/men/1.jpg');
    const [showAvatarSelector, setShowAvatarSelector] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState<UserModelDTO>({
        userId: 0,
        userName: '',
        email: '',
        phoneNumber: '',
    });

    // Toggle Avatar Selector visibility
    const toggleAvatarSelector = () => {
        setShowAvatarSelector(!showAvatarSelector);
    };

    // Toggle the edit mode for user details
    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    // Handle input change in the edit form
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    useEffect(() => {
        // Only fetch user details if userIdFromStore is available
        if (userIdFromStore) {
            dispatch(getUserDetailsById(userIdFromStore));
        }
    }, [dispatch, userIdFromStore]);

    useEffect(() => {
        // Update the local user state after the user details are fetched
        if (userDetailsStatus === 'fulfilled' && userDetails) {
            setUser({
                userId: userDetails.userId,
                userName: userDetails.userName,
                email: userDetails.email,
                phoneNumber: userDetails.phoneNumber,
            });
        }
    }, [userDetailsStatus, userDetails]);

    // Render loading, error, or profile data based on the fetch status
    if (userDetailsStatus === 'pending') {
        return <div>Loading...</div>;
    }

    if (userDetailsStatus === 'rejected') {
        return <div>Error: {userDetailsError}</div>;
    }


    return (
        <>
            <div className="profile-container">
                <div className="profile-header">
                    <div className="avatar-container" onClick={toggleAvatarSelector}>
                        <img src={avatar} alt="Profile" className="profile-picture" />
                        <div className="edit-icon">
                            <FaEdit />
                        </div>
                    </div>
                    <h1>{user.userName}</h1>
                    <p>{user.email}</p>
                </div>
                {showAvatarSelector && (
                    <AvatarSelector
                        onSelect={(selectedAvatar) => {
                            setAvatar(selectedAvatar);
                            setShowAvatarSelector(false);
                        }}
                    />
                )}
                <div className="profile-details">
                    <h2>Contact Information</h2>
                    {isEditing ? (
                        <div className="edit-form">
                            <input
                                type="text"
                                name="userName"
                                value={user.userName}
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
                                name="phoneNumber"
                                value={user.phoneNumber}
                                onChange={handleInputChange}
                                placeholder="Phone"
                            />
                            <button className="save-profile-button" onClick={handleEditToggle}>
                                Save
                            </button>
                        </div>
                    ) : (
                        <>
                            <p>
                                <strong>Phone:</strong> {user.phoneNumber}
                            </p>
                            <button className="edit-profile-button" onClick={handleEditToggle}>
                                Edit Profile
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Profile;

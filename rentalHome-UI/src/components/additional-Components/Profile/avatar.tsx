import React, { useState } from 'react';


const avatars = [
    'https://i.pravatar.cc/150?img=1',
    'https://i.pravatar.cc/150?img=2',
    'https://i.pravatar.cc/150?img=3',
    'https://randomuser.me/api/portraits/men/1.jpg',
    'https://placekitten.com/150/150',
];

const AvatarSelector: React.FC<{ onSelect: (avatar: string) => void }> = ({ onSelect }) => {
    const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);

    const handleSelect = (avatar: string) => {
        setSelectedAvatar(avatar);
        onSelect(avatar);
    };

    return (
        <div className="avatar-selector">
            <h3>Select Your Avatar</h3>
            <div className="avatar-options">
                {avatars.map((avatar, index) => (
                    <div
                        key={index}
                        className={`avatar-option ${selectedAvatar === avatar ? 'selected' : ''}`}
                        onClick={() => handleSelect(avatar)}
                        style={{ backgroundImage: `url(${avatar})` }}
                    />
                ))}
            </div>
        </div>
    );
};

export default AvatarSelector;

import React from 'react';
import { useSelector } from 'react-redux';

const ProfileCard = () => {
    const { currentUser } = useSelector((state) => state.user);
  
  return (
    <div className="flex items-center space-x-4 p-4 bg-secondary rounded-md text-primary_text">
      <img
        src={currentUser.image || '/default-avatar.png'}
        alt="User Profile"
        className="w-10 h-10 rounded-full"
      />
      <div>
        <h2 className="text-lg font-semibold">{currentUser.username || 'User Name'}</h2>
        <p className="text-sm text-secondary_text">{currentUser.email || 'user@example.com'}</p>
      </div>
    </div>
  );
};

export default ProfileCard;

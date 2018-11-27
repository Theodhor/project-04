import React from 'react';

const UserCard = ({name, surname, profile_image}) => {
  return (
    <div className="card-contenitor">
      <div className="card-holder">
        <div className="user-image-card">
          <img className="full-height" src={profile_image} alt="nothing"/>
        </div>
        <div className="user-card-cred">{name} {surname}</div>
      </div>
    </div>

  );
};

export default UserCard;

import React from 'react';

const UserCard = ({name, surname, profile_image}) => {
  return (
    <div className="card">
      <header className="card-header">
        <p className="cardup">{name}</p>
        <p className="cardup">{surname}</p>
      </header>
      <div className="card-image">
        <img src={profile_image} alt="nothing" />
      </div>
    </div>

  );
};

export default UserCard;

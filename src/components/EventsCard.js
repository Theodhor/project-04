import React from 'react';

const EventsCard = ({where, when, what, creator}) => {
  return (
    <div className="card">
      <header className="card-header">
        <p className="cardup">{where}</p>
        <p className="cardup">{when}</p>
        <p className="cardup">{what}</p>
      </header>
      <div className="card-image">
        <img src={creator.profile_image} alt="nothing" />
      </div>
    </div>

  );
};

export default EventsCard;

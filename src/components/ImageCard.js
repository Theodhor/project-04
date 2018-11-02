import React from 'react';

const ImageCard = ({source}) => {


  return (
    <div className="card">
      <header className="card-header">
        <h2 className="card-header-title">Photo</h2>
      </header>
      <div className="card-image">
        <img src={source} alt="nothing" />
      </div>
    </div>

  );
};

export default ImageCard;

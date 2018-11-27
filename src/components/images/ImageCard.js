import React from 'react';

const ImageCard = ({source}) => {


  return (
    <div className="card">
      <div className="card-image">
        <img src={source} alt="nothing" />
      </div>
    </div>

  );
};

export default ImageCard;

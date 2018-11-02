import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../lib/Auth';

import ImageCard from './ImageCard';

class ImageIndex extends React.Component {
  constructor() {
    super();
    this.state = {images: []};

  }

  componentDidMount(){
    axios.get('/api/images')
      .then(res => this.setState({ images: res.data }));
  }

  render() {
    return (
      <main className="section">
        <div className="container">
          <h1 className="title"> Image </h1>
          <ul className="columns is-multiline">
            {this.state.images.map(image =>
              <li
                className="column is-one-quarter-desktop is-one-third-tablet"
                key={image.id}
              >
                <Link to={`/images/${image.id}`}>
                  <ImageCard {...image} />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </main>
    );
  }
}

export default ImageIndex;

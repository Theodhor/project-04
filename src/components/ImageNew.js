import React from 'react';
import axios from 'axios';
import Auth from '../lib/Auth';

class ImageNew extends React.Component {
  constructor() {
    super();
    this.state = { image: null };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const image = { ...this.state.image, [e.target.name]: e.target.value };
    this.setState({ image, error: '' });
    console.log(this.state.image);
  }

  handleSubmit(e) {
    const token = Auth.getToken();
    e.preventDefault();
    axios
      .post('/api/images', this.state.image, {
        headers: {Authorization: `Bearer ${token}`}
      })
      .then( () => {
        this.props.history.push('/images');
      })
      .catch(() => this.setState({error: 'Invalid credentials'}));
  }

  render() {
    return (
      <main className="section">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <h2 className="title">Create an image</h2>
            <div className="field">
              <label className="label">Insert the image link</label>
              <div className="control">
                <input className={`input ${this.state.error ? 'is-danger' : ''} `} name="source" placeholder="image" onChange={this.handleChange} />
              </div>
            </div>
            <div className="level control">
              <div className="level-item">
                <button className="button is-primary is-rounded is-medium">Submit</button>
              </div>
            </div>
          </form>
          <div className="imgcont">
            {this.state.image && <img className="editimage" src={this.state.image.source} />}
          </div>
        </div>
      </main>
    );
  }
}

export default ImageNew;

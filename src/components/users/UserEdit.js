import React from 'react';
import axios from 'axios';

import Auth from '../../lib/Auth';

class UserEdit extends React.Component {
  constructor() {
    super();
    this.state = { user: {} };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    axios.get('/api/users/' + Auth.getPayload().sub)
      .then(res => this.setState({ user: res.data}));
  }

  handleChange(e) {
    const user = { ...this.state.user, [e.target.name]: e.target.value };
    this.setState({ user, error: '' });
  }

  handleSubmit(e) {
    e.preventDefault();
    const token = Auth.getToken();
    axios
      .put(`/api/users/${this.props.match.params.id}`, this.state.user, {
        headers: {Authorization: `Bearer ${token}`}
      })
      .then( () => {
        this.props.history.push('/');
      })
      .catch(() => this.setState({error: 'Invalid user'}));
  }

  render() {
    return (
      <main className="section">
        <div className="container">
          <div className="columns">
            <form onSubmit={this.handleSubmit} className="column is-half">
              <h2 className="title">Edit page</h2>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input className={`input ${this.state.error ? 'is-danger' : ''} `} name="name" placeholder="Name" onChange={this.handleChange} value={this.state.user.name} />
                </div>
              </div>
              <div className="field">
                <label className="label">Surname</label>
                <div className="control">
                  <input className={`input ${this.state.error ? 'is-danger' : ''} `} name="surname" placeholder="Surname" onChange={this.handleChange} value={this.state.user.surname} />
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input className={`input ${this.state.error ? 'is-danger' : ''} `} name="email" placeholder="Email" onChange={this.handleChange} value={this.state.user.email} />
                </div>
              </div>
              <div className="field">
                <label className="label">Profile Image</label>
                <div className="control">
                  <input className={`input ${this.state.error ? 'is-danger' : ''} `} name="profile_image" placeholder="Profile Image" onChange={this.handleChange} value={this.state.user.profile_image}/>
                </div>
              </div>

              {this.state.error && <small className="help is-danger">{this.state.error}</small>}

              <div className="level control">
                <div className="level-item">
                  <button className="button is-primary is-rounded is-medium">Submit</button>
                </div>
              </div>
            </form>
            <div className="column is-half centralize">
              <div className="card">
                <div className="edit-image-contenitor">
                  <figure className="edit-image">
                    <img className="full-height" src={this.state.user.profile_image} alt="nothing" />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default UserEdit;

import React from 'react';
import axios from 'axios';
import Auth from '../lib/Auth';

class EventsNew extends React.Component {
  constructor() {
    super();
    this.state = { event: null };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const event = { ...this.state.event, [e.target.name]: e.target.value };
    this.setState({ event, error: '' });
  }

  handleSubmit(e) {
    const token = Auth.getToken();
    e.preventDefault();
    axios
      .post('/api/events', this.state.event, {
        headers: {Authorization: `Bearer ${token}`}
      })
      .then( () => {
        this.props.history.push('/events');
      })
      .catch(() => this.setState({error: 'Invalid credentials'}));
  }

  render() {
    return (
      <main className="section">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <h2 className="title">Create an event</h2>
            <div className="field">
              <label className="label">Where</label>
              <div className="control">
                <input className={`input ${this.state.error ? 'is-danger' : ''} `} name="where" placeholder="where" onChange={this.handleChange} />
              </div>
            </div>
            <div className="field">
              <label className="label">When</label>
              <div className="control">
                <input className={`input ${this.state.error ? 'is-danger' : ''} `} name="when" placeholder="when" onChange={this.handleChange} />
              </div>
            </div>
            <div className="field">
              <label className="label">What</label>
              <div className="control">
                <input className={`input ${this.state.error ? 'is-danger' : ''} `} name="what" placeholder="what" onChange={this.handleChange} />
              </div>
            </div>
            <div className="level control">
              <div className="level-item">
                <button className="button is-primary is-rounded is-medium">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </main>
    );
  }
}

export default EventsNew;

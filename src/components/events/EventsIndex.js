import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import EventsCard from './EventsCard';

class EventsIndex extends React.Component {
  constructor() {
    super();
    this.state = {events: []};

  }

  componentDidMount(){
    axios.get('/api/events')
      .then(res => this.setState({ events: res.data }));
  }

  render() {
    return (
      <main className="section">
        <div className="container">
          <h1 className="title"> Events </h1>
          <ul className="columns is-multiline">
            {this.state.events.map(event =>
              <li
                className="column is-one-quarter-desktop is-one-third-tablet"
                key={event.id}
              >
                <Link to={`/events/${event.id}`}>
                  <EventsCard {...event} />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </main>
    );
  }
}

export default EventsIndex;

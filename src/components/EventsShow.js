import React from 'react';
import axios from 'axios';
import Auth from '../lib/Auth';
import { Link } from 'react-router-dom';
import UserCard from './UsersCard';

class EventsShow extends React.Component {
  constructor() {
    super();
    this.state = { event: null };
    this.partecipate = this.partecipate.bind(this);
    this.dePartecipate = this.dePartecipate.bind(this);
  }
  getEvent(){
    const token = Auth.getToken();
    axios
      .get(`/api/events/${this.props.match.params.id}`,{
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(res => this.setState({ event: res.data }));
  }

  componentDidMount() {
    this.getEvent();
  }

  getPartecipants(){
    return this.state.event.list.filter((element) => element.confirmed === true);
  }

  getInvited(){
    return this.state.event.list.filter((element) => element.confirmed === false);
  }

  checkIfInvited(){
    return this.state.event.list.find((element) => element.invited.id === Auth.getPayload().sub);
  }
  checkIfPartecipating(){
    return this.checkIfInvited().confirmed ? true : false;

  }

  checkIfYouCreate(){
    return this.state.event.creator.id === Auth.getPayload().sub ? true : false;
  }

  partecipate(){
    const token = Auth.getToken();
    const listId = this.checkIfInvited().id;
    const data = {event_id: this.props.match.params.id, invited_id: Auth.getPayload().sub, confirmed: true };
    axios.put(`/api/list/${listId}`, data, {
      headers: {Authorization: `Bearer ${token}`}
    })
      .catch(() => this.setState({error: 'Invalid credentials'}))
      .then(() => this.getEvent());
  }
  dePartecipate(){
    const token = Auth.getToken();
    const listId = this.checkIfInvited().id;
    const data = {event_id: this.props.match.params.id, invited_id: Auth.getPayload().sub, confirmed: false };
    axios.put(`/api/list/${listId}`, data, {
      headers: {Authorization: `Bearer ${token}`}
    })
      .catch(() => this.setState({error: 'Invalid credentials'}))
      .then(() => this.getEvent());
  }



  render() {
    if(!this.state.event) return null;
    return (
      <main className="section">
        <div className="container">
          <div className="columns is-multiline">
            <div className="column is-one-third frstm">
              <img className="column is-three-quarters" src={this.state.event.creator.profile_image} alt="nothing"/>
              <div className="columns">
                <h1 className="title column is-one-third">{ this.state.event.when}</h1>
                <h1 className="title column is-one-third">{ this.state.event.where }</h1>
                <p className="title column is-one-third">{ this.state.event.what }</p>
              </div>
              {!this.checkIfInvited() && !this.checkIfYouCreate() &&
                <div className="column">
                  Sorry, you are not invited
                </div>
              }
              {this.checkIfYouCreate() &&
                <div className="column">
                  You created this event
                </div>
              }
              {this.checkIfInvited() && this.checkIfPartecipating() && !this.checkIfYouCreate() &&

                <button className="choice" onClick={this.dePartecipate}>Im not going anymore</button>
              }
              {this.checkIfInvited() && !this.checkIfPartecipating() && !this.checkIfYouCreate() &&

                <button className="choice" onClick={this.partecipate}>Partecipate</button>
              }
            </div>
            <div className="column is-two-thirds">
              {this.getPartecipants().length > 0 &&
              <div className="column frstm title">
                Partecipants list
              </div>
              }
              {this.getPartecipants().length === 0 &&
              <div className="column frstm title">
                No one is going to this event
              </div>
              }
              <ul className="columns is-multiline">
                {this.getPartecipants().map(element =>
                  <li
                    className="column is-half usincont"
                    key={element.invited.id}
                  >
                    <Link to={`/users/${element.invited.id}`}>
                      <UserCard {...element.invited} />
                    </Link>
                  </li>
                )}
              </ul>
              {this.getInvited().length > 0 &&
              <div className="column frstm title">
                Invited list
              </div>
              }
              {this.getInvited().length === 0 &&
              <div className="column frstm title">
                No other people expected to partecipate
              </div>
              }
              <ul className="columns is-multiline">
                {this.getInvited().map(element =>
                  <li
                    className="column is-half usincont"
                    key={element.invited.id}
                  >
                    <Link to={`/users/${element.invited.id}`}>
                      <UserCard {...element.invited} />
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default EventsShow;

import React from 'react';
import axios from 'axios';
import Auth from '../lib/Auth';
import { Link } from 'react-router-dom';
import UsersCard from './UsersCard';
import ImageCard from './ImageCard';


class UserShow extends React.Component {
  constructor() {
    super();
    this.state = { user: null, friend: null };
    this.makeRequest = this.makeRequest.bind(this);
    this.acceptRequest = this.acceptRequest.bind(this);
    this.refuseRequest = this.refuseRequest.bind(this);
    this.abortRequest = this.abortRequest.bind(this);
    this.dropFriend = this.dropFriend.bind(this);
  }

  getUser() {
    const token = Auth.getToken();
    return axios
      .get(`/api/users/${this.props.match.params.id}`,{
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(res => this.setState({user: res.data}));
  }
  isFriend(){
    return !!this.state.user.friends.find(user => user.id === Auth.getPayload().sub);
  }
  isNotConfirmedFriend(){
    return !!this.state.user.not_confirmed_friends.find(user => user.id === Auth.getPayload().sub);
  }
  isRequestSent(){
    return !!this.state.user.request_sent.find(user => user.id === Auth.getPayload().sub);
  }
  isMe(){
    return parseInt(this.props.match.params.id) === Auth.getPayload().sub;
  }

  canMakeRequest() {
    return !this.isFriend() && !this.isNotConfirmedFriend() && !this.isRequestSent() && !this.isMe();
  }

  componentDidMount() {
    this.getUser();
  }
  makeRequest(){

    const token = Auth.getToken();
    const data = {sender_id: Auth.getPayload().sub, receiver_id: this.state.user.id, status: false };
    axios.post('/api/friends', data, {
      headers: {Authorization: `Bearer ${token}`}
    })
      .catch(() => this.setState({error: 'Invalid credentials'}))
      .then(() => this.getUser());
  }
  acceptRequest(){
    const token = Auth.getToken();
    const data = {sender_id: this.state.user.id.sub, receiver_id: Auth.getPayload().sub, status: true };
    const friend = this.state.user.request_sent
      .find(friend => friend.id === Auth.getPayload().sub);
    const id = friend.friend_id;
    axios.put(`/api/friends/${id}`, data, {
      headers: {Authorization: `Bearer ${token}`}
    })
      .catch(() => this.setState({error: 'Invalid credentials'}))
      .then(() => this.getUser());
  }
  refuseRequest(){
    const token = Auth.getToken();
    const friend = this.state.user.request_sent
      .find(friend => friend.id === Auth.getPayload().sub);
    const id = friend.friend_id;
    axios.delete(`/api/friends/${id}`, {
      headers: {Authorization: `Bearer ${token}`}
    })
      .catch(() => this.setState({error: 'Invalid credentials'}))
      .then(() => this.getUser());
  }
  abortRequest(){
    const token = Auth.getToken();
    const friend = this.state.user.not_confirmed_friends
      .find(friend => friend.id === Auth.getPayload().sub);
    const id = friend.friend_id;
    axios.delete(`/api/friends/${id}`, {
      headers: {Authorization: `Bearer ${token}`}
    })
      .catch(() => this.setState({error: 'Invalid credentials'}))
      .then(() => this.getUser());
  }
  dropFriend(){
    const token = Auth.getToken();
    const friend = this.state.user.friends
      .find(friend => friend.id === Auth.getPayload().sub);
    const id = friend.friend_id;
    axios.delete(`/api/friends/${id}`, {
      headers: {Authorization: `Bearer ${token}`}
    })
      .catch(() => this.setState({error: 'Invalid credentials'}))
      .then(() => this.getUser());
  }



  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname) this.getUser();
  }


  render() {
    if(!this.state.user) return null;
    return (
      <main className="section">
        <div className="container">
          <div className="columns is-multiline">
            <div className="column is-one-third">
              <div className="section">
                <div className="friendrel">Friends</div>
                <ul className="columns is-multiline">
                  {this.state.user.friends.map(friend =>
                    <li
                      className="column is-half usincont"
                      key={friend.id}
                    >
                      <Link to={`/users/${friend.id}`}>
                        <UsersCard {...friend} />
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
              {this.state.user.id === Auth.getPayload().sub && <div>
                <div className="section">
                  <div className="friendrel">Request recieved</div>
                  <ul className="columns is-multiline">
                    {this.state.user.not_confirmed_friends.map(friend =>
                      <li
                        className="column is-half usincont"
                        key={friend.id}
                      >
                        <Link to={`/users/${friend.id}`}>
                          <UsersCard {...friend} />
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>

                <div className="section">
                  <div className="friendrel"> Requests sent </div>
                  <ul className="columns is-multiline">
                    {this.state.user.request_sent.map(friend =>
                      <li
                        className="column is-half usincont"
                        key={friend.id}
                      >
                        <Link to={`/users/${friend.id}`}>
                          <UsersCard {...friend} />
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              </div>}
            </div>

            <div className="column is-half mainprof">
              <div className="columns column">
                <div className="column is-two-thirds">
                  <img className=" profimage" src={this.state.user.profile_image} alt="nothing" />
                </div>
                <div className="column is-one-third profinfo">
                  <div>
                    <p className="credentials">{this.state.user.name}</p>
                    <p className="credentials">{this.state.user.surname}</p>
                  </div>
                  <div>
                    <p className="email">{this.state.user.email}</p>
                  </div>
                </div>
              </div>
              <div className="column prfbtn">
                {this.canMakeRequest() && <div className="nrfr">
                  <div className="boolbtn">
                    <button className="choice" onClick={this.makeRequest}>
                      Require friendship
                    </button>
                  </div>
                </div>}
                {this.isFriend() && <div className="nrfr">
                  <div className="frstm">
                    You and {this.state.user.name} are friends
                  </div>
                  <div className="boolbtn">
                    <button className="choice" onClick={this.dropFriend}>
                      Drop friend
                    </button>
                  </div>
                </div>}

                {this.isRequestSent() && <div className="nrfr">
                  <div className="frstm">
                    {this.state.user.name} wants to be your friend
                  </div>
                  <div className="boolbtn">
                    <button className="choice" onClick={this.acceptRequest}>
                      I agree
                    </button>
                    <button className="choice" onClick={this.refuseRequest}>
                      I disagree
                    </button>
                  </div>
                </div>}
                {this.isNotConfirmedFriend() && <div className="nrfr">
                  <div className="frstm">
                    You sent a friend request to {this.state.user.name}
                  </div>
                  <div className="boolbtn">
                    <button className="choice" onClick={this.abortRequest}>
                      I regret
                    </button>
                  </div>
                </div>}
              </div>
              <ul className="columns is-multiline columns">
                {this.state.user.images.map(image =>
                  <li
                    className="column is-half usincont"
                    key={image.id}
                  >
                    <Link to={`/images/${image.id}`}>
                      <ImageCard {...image} />
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

export default UserShow;

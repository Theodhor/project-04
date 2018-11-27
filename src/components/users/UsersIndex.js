import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import UserCard from './UsersCard';
import FilterBarName from '../FilterBarName';
import FilterBarSurname from '../FilterBarSurname';

class UserIndex extends React.Component {
  constructor() {
    super();
    this.state = {users: [], searchName: '', searchSurname: '', limit: 8};
    this.handleChange = this.handleChange.bind(this);
    this.increaseLimit = this.increaseLimit.bind(this);
    this.decreaseLimit = this.decreaseLimit.bind(this);
  }
  componentDidMount(){
    axios.get('/api/users')
      .then(res => this.setState({ users: res.data }));
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value, limit: 8 });
  }
  filterUsersByName() {
    const re = new RegExp(this.state.searchName, 'i');
    return this.state.users.filter(user => {
      return re.test(user.name);
    });
  }
  filterUsersBySurname() {
    const re = new RegExp(this.state.searchSurname, 'i');
    return this.state.users.filter(user => {
      return re.test(user.surname);
    });
  }
  filterUsers(){
    const nameFiltered = this.filterUsersByName();
    const surnameFiltered = this.filterUsersBySurname();
    if(!this.state.searchName && !this.state.searchSurname) return this.state.users;
    if(this.state.searchName && !this.state.searchSurname) return nameFiltered;
    if(!this.state.searchName && this.state.searchSurname) return surnameFiltered;
    return nameFiltered.filter(element => surnameFiltered.includes(element));
  }
  setLimit(){
    const input = this.filterUsers();
    return input.length <= this.state.limit ?  input : input.slice(0,this.state.limit);
  }
  increaseLimit(){
    const input = this.filterUsers();
    input.length > this.state.limit + 4
      ? this.setState({limit: this.state.limit + 4})
      : this.setState({limit: input.length});
  }
  decreaseLimit(){
    this.state.limit - 4 < 8
      ? this.setState({limit: 8})
      : this.state.limit % 4 === 0
        ? this.setState({limit: this.state.limit - 4})
        : this.setState({limit: this.state.limit - (this.state.limit % 4)});
  }
  render() {
    return (
      <main className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-half">
              <FilterBarName handleChange={this.handleChange} />
            </div>
            <div className="column is-half">
              <FilterBarSurname handleChange={this.handleChange} />
            </div>
          </div>

          <ul className="columns is-multiline">
            {this.setLimit().length > 0 ? this.setLimit().map(user =>
              <li
                className="column is-one-quarter-desktop is-one-third-tablet user-card"
                key={user.id}
              >
                <Link to={`/users/${user.id}`}>
                  <UserCard {...user} />
                </Link>
              </li>
            )
              :
              <img src="http://m.memegen.com/jvuug4.jpg" className="error"/>
            }
          </ul>
          <div className="around">
            {this.filterUsers().length > this.state.limit &&
              <button className="choice" onClick={this.increaseLimit}>Show more</button>
            }
            {this.state.limit > 8 &&
              <button className="choice" onClick={this.decreaseLimit}>Show less</button>
            }
          </div>
        </div>
      </main>
    );
  }
}
export default UserIndex;

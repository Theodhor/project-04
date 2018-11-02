import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import UserCard from './UsersCard';
import FilterBarName from './FilterBarName';
import FilterBarSurname from './FilterBarSurname';

class UserIndex extends React.Component {
  constructor() {
    super();
    this.state = {users: [], searchName: '', searchSurname: ''};
    this.handleChange = this.handleChange.bind(this);

  }

  componentDidMount(){
    axios.get('/api/users')
      .then(res => this.setState({ users: res.data }));
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state.searchName, this.state.searchSurname);
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
    if(!this.state.searchName && !this.state.searchSurname){
      return this.state.users;
    }
    if(this.state.searchName && !this.state.searchSurname){
      return this.filterUsersByName();
    }
    if(!this.state.searchName && this.state.searchSurname){
      return this.filterUsersBySurname();
    }
    const nameFiltered = this.filterUsersByName();
    const surnameFiltered = this.filterUsersBySurname();
    return nameFiltered.filter(element => surnameFiltered.includes(element));
  }


  render() {
    return (
      <main className="section">
        <div className="container">
          <h1 className="title"> User </h1>
          <div className="column">
            <FilterBarName handleChange={this.handleChange} />
          </div>
          <div className="column">
            <FilterBarSurname handleChange={this.handleChange} />
          </div>
          <ul className="columns is-multiline">
            {this.filterUsers().length > 0 ? this.filterUsers().map(user =>

              <li
                className="column is-one-quarter-desktop is-one-third-tablet usincont"
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
        </div>
      </main>
    );
  }
}

export default UserIndex;

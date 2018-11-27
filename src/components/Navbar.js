import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../lib/Auth';


class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { navbarActive: false };
    this.logout = this.logout.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname)
      this.setState({ navbarActive: false});
  }

  logout = () => {
    Auth.logout();
    this.props.history.push('/');
  };

  toggleNavbar() {
    this.setState({ navbarActive: !this.state.navbarActive });
  }
  render() {
    return (
      <nav className="navbar sticky" role="navigation" aria-label="main navigation">
        <div className="container spread">
          <a role="button" className={`navbar-burger ${this.state.navbarActive ? 'is-active' : ''}`} aria-label="menu" aria-expanded="false" onClick={this.toggleNavbar}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>

          <div className= {`navbar-menu spread ${this.state.navbarActive ? 'is-active' : ''}`}>
            {!Auth.isAuthenticated() && <Link className="navbar-item" to="/login">Login</Link>}
            {!Auth.isAuthenticated() &&   <img className="smallImage" src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/Peter_Griffin.png/220px-Peter_Griffin.png" alt="nothing"/>}
            {!Auth.isAuthenticated() &&
              <Link className="navbar-item" to="/">
              FAKEBOOK
              </Link>
            }
            {!Auth.isAuthenticated() &&
            <img className="smallImage" src="https://upload.wikimedia.org/wikipedia/en/0/02/Homer_Simpson_2006.png" alt="nothing"/>}
            {!Auth.isAuthenticated() && <Link className="navbar-item" to="/register">Register</Link>}
            {Auth.isAuthenticated() && <Link className="navbar-item" to="/images/new">Add a photo</Link>}
            {Auth.isAuthenticated() && <Link className="navbar-item" to={`/users/${Auth.getPayload().sub}/edit`}>Edit profile</Link>}
            {Auth.isAuthenticated() && <Link className="navbar-item" to={`/users/${Auth.getPayload().sub}`}>My profile</Link>}
            {Auth.isAuthenticated() &&
              <Link className="navbar-item" to="/">
              FAKEBOOK
              </Link>
            }
            {Auth.isAuthenticated() && <Link className="navbar-item" to="/users">Users</Link>}
            {Auth.isAuthenticated() && <Link className="navbar-item" to="/events">Events</Link>}
            {Auth.isAuthenticated() && <Link className="navbar-item" to="/events/new">Create new event</Link>}
            {Auth.isAuthenticated() && <a className="navbar-item" onClick={this.logout}>Logout</a>}
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bulma';
import './scss/style.scss';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import UsersIndex from './components/UsersIndex';
import UsersShow from './components/UsersShow';
import UserEdit from './components/UserEdit';
import EventsIndex from './components/EventsIndex';
import EventsShow from './components/EventsShow';
import EventsNew from './components/EventsNew';
import ImageIndex from './components/ImageIndex';
import ImageShow from './components/ImageShow';
import ImageNew from './components/ImageNew';

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar/>
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/users/:id/edit" component={UserEdit} />
            <Route path="/users/:id" component={UsersShow} />
            <Route path="/users" component={UsersIndex} />
            <Route path="/events/new" component={EventsNew} />
            <Route path="/events/:id" component={EventsShow} />
            <Route path="/events" component={EventsIndex} />
            <Route path="/events/new" component={EventsNew} />
            <Route path="/events/:id" component={EventsShow} />
            <Route path="/events" component={EventsIndex} />
            <Route path="/images/new" component={ImageNew} />
            <Route path="/images/:id" component={ImageShow} />
            <Route path="/images" component={ImageIndex} />
            <Route path="/" component={UsersIndex} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }

}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

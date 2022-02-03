import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import Search from './pages/Search';

class BooksApp extends React.Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default BooksApp;

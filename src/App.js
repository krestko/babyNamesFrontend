import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import ListPage from './pages/ListPage';
import ListNamesPage from './pages/ListNamesPage';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <NavBar />
          <Route exact path='/babynames' component={HomePage} />
          <Route exact path='/babynames/:userID' component={UserPage} />
          <Route exact path='/babynames/:userID/lists' component={ListNamesPage} />
          <Route exact path='/babynames/:userID/lists/:listID' component={ListPage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <NavBar />
          <Route exact path='/' component={HomePage} />
          <Route exact path='/:listID' component={ListPage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

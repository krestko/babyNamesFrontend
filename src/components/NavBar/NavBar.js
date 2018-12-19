import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListsAPI from '../../api/ListsAPI';
import NamesAPI from '../../api/NamesAPI';
import './NavBar.css';

class NavBar extends Component {
  state = {
    rand: [0, 1][Math.floor(Math.random() * [0, 1].length)],
    names: null
  }

  componentDidMount() {
    ListsAPI.fetchLists()
    .then((json) => NamesAPI.fetchNamesByListID(json[this.state.rand].id))
    .then(json => this.setState({
      names: json
    }))
  }

  listNames = () => {
    return this.state.names.map((name, index) => {
      if(index <= 6) {
        return (
          <div key={index} className='nav-link'>
            {name.baby_name}
          </div>
        )
      }
    })
  }

  render() {
    console.log(this.state.rand)
    return (
      <nav className='navbar-nav'>
        <div className='navbar-links'>
          { this.state.names !== null && this.state.names.length > 1 ? this.listNames(): null }
        </div>
      </nav>
    );
  }
}

export default NavBar;
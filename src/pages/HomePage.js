import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ListsAPI from '../api/ListsAPI';
import '../App.css';
import './ListNamesPage.css'

class HomePage extends Component {
  state = {
    lists: null
  }

  componentDidMount() {
    ListsAPI.fetchLists()
    .then(json => this.setState({ lists: json }))
  }

  listGenerator = (listID = 0) => {
    if(listID !== 0) {
      return this.state.lists.map((list, index) => {
        if(list === listID) {
          return this.listGenerator();
        } else if(index === this.state.lists.length - 1) {
          ListsAPI.addList({list_name: listID});
          return <Redirect key={index} to={`/${listID}`} />
        }
      })
    } else {
      let listID = '';
      const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

      let counter = 6;
      while(counter > 0) {
        listID += nums[Math.floor(Math.random() * nums.length)];
        listID += letters[Math.floor(Math.random() * letters.length)];
        counter--;
      }
      return this.listGenerator(listID);
    }
  } 

  render() {
    if(this.state.lists) {
      return this.listGenerator()
    }
    return (
      <div>
      </div>
    )
  }
}

export default HomePage;
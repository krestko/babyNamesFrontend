import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import ListsAPI from '../api/ListsAPI';
import UsersAPI from '../api/UsersAPI';
import '../App.css';
import './ListNamesPage.css'

class UserPage extends Component {
  state = {
    lists: null,
    user: null,
    list: null,
    list_name: '',
    redirect: null,
    length: null
  }

  componentDidMount() {
    ListsAPI.fetchLists()
    .then(json => this.setState({
      lists: json
    }))
    UsersAPI.fetchUserByID(this.props.match.params.userID)
    .then(json => this.setState({
      user: json
    }))
  }

  checkListName = () => {
    let counter = 0;
    while(counter < this.state.lists.length) {
      if(this.state.lists[counter].list_name === this.state.list_name.trim()) {
        this.setState({ 
          list_name: '',
          redirect: false
        })
        break;
      } else if(counter === this.state.lists.length - 1) {
        ListsAPI.addList({list_name: this.state.list_name.trim()})
        .then(() => ListsAPI.fetchLists())
        .then(json => 
          this.setState({
            lists: json,
            redirect: true
        }))
      } 
      counter++;
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if(this.state.list_name.length < 12 || /^[a-z]+[0-9]+$/gi.test(`${this.state.list_name}`) === false && /[0-9]+[a-z]+/gi.test(`${this.state.list_name}`) === false) {
      return this.setState({
        list_name: '',
        length: false
      })
    }
    this.checkListName();
  }

  handleListName = (e) => {
    this.setState({list_name: e.target.value});
  }

  listNameParams = () => {
    return (
      <div>
        <h6>List name must be at least 12 characters long and contain at least one letter and one number. **Do not include spaces in list name**</h6>
      </div>
    )
  }
    
  render() {
    if(this.state.redirect) {
      return this.state.lists.map((list, index) => {
        if(list.list_name === this.state.list_name) {
          return <Redirect key={index} to={`/babynames/${this.props.match.params.userID}/lists/${list.id}`} />
        }
      })
    }

    return (
      <div>
        { this.state.user ? <h1>{this.state.user.user_name}</h1>: null }
        <form>
          <h5>Create New Baby Name List:</h5>
          <input type='text' value={this.state.list_name} onChange={this.handleListName} />
          <button type="button" onClick={this.handleSubmit}>Submit</button>
          { this.state.redirect === null || this.state.length === false ? this.listNameParams(): this.state.redirect === false ? <h6>That list name is taken. Please try another name.</h6>: null }
        </form>
        <div className='extra-navs'>
          <Link to={`/babynames/${this.props.match.params.userID}/lists`}>|All User Lists|</Link>
        </div>
      </div>
    )
  }
}

export default UserPage;
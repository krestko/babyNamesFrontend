import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import UsersAPI from '../api/UsersAPI';
import '../App.css';
import './ListNamesPage.css'

class HomePage extends Component {
  state = {
    users: null,
    user_name: '',
    user: null,
    redirect: null
  }

  componentDidMount() {
    UsersAPI.fetchUsers()
    .then(json => this.setState({
      users: json
    }))
  }

  checkName = () => {
      let counter = 0;
      while(counter < this.state.users.length) {
        if(this.state.users[counter].user_name === this.state.user_name) {
          this.setState({
            user: this.state.users[counter], 
            redirect: true 
          });
          break;
        } else if(counter === this.state.users.length - 1) {
          this.setState({
            user_name: '',
            redirect: false
          })
        }
        counter++;
      }
    }

  handleSubmit = (e) => {
    e.preventDefault();
    this.checkName();
  }

  handleUserName = (e) => {
    this.setState({user_name: e.target.value});
  }
    
  render() {
    if(this.state.redirect) {
      return <Redirect to={`/babynames/${this.state.user.id}`} />
    }

    return (
      <div>
        <form>
          <h1>Welcome!</h1>
          { this.state.redirect === false ? <h6>Invalid User Name</h6>: null }
          <input type='text' value={this.state.user_name} onChange={this.handleUserName} />
          <button type="button" onClick={this.handleSubmit}>Submit</button>
          <h5>Please enter user name</h5>
        </form>
      </div>
    )
  }
}

export default HomePage;
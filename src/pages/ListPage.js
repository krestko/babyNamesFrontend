import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NamesAPI from '../api/NamesAPI';
import ListsAPI from '../api/ListsAPI';
import UsersAPI from '../api/UsersAPI';
import '../App.css';
import './ListNamesPage.css'

class ListPage extends Component {
  state = {
    list: null,
    names: null,
    baby_name: '',
    redirect: null,
    name_params: null
  }

  componentDidMount() {
    UsersAPI.updateUserData(this.props.match.params.userID, {recently_viewed_list: this.props.match.params.listID})
    ListsAPI.fetchListByID(this.props.match.params.listID)
    .then(json => this.setState({
      list: json
    }))
    NamesAPI.fetchNamesByListID(this.props.match.params.listID)
    .then(json => this.setState({
      names: json
    }))
  }

  displayNames = () => {
    let sortedNames = [];
    this.state.names.map(name => {
      name.baby_name = name.baby_name.toUpperCase();
      sortedNames.push(name);
    })
    sortedNames.sort((a, b) => {
      let A = a.baby_name;
      let B = b.baby_name;
      return (A < B) ? -1: (A > B) ? 1: 0;
    });
    return sortedNames.map((name, index) => {
      return (
        <div key={index} className='baby-name'>
          {name.baby_name.toLowerCase()}<br/>
        </div>
      )
    })
  }

  handleNameSave = () => {
    NamesAPI.addListName(this.state.list.id, {baby_name: this.state.baby_name})
    .then(() => NamesAPI.fetchNamesByListID(this.state.list.id))
    .then(json => {
      this.setState({
        names: json,
        baby_name: '',
        redirect: true
    })})
  }

  checkBabyName = () => {
    if(this.state.names.length === 0) {
      this.handleNameSave();
    }
    let counter = 0;
    while(counter < this.state.names.length) {
      if(this.state.names[counter].baby_name === this.state.baby_name) {
        this.setState({ 
          baby_name: '',
          redirect: false
        })
        break;
      } else if(counter === this.state.names.length - 1) {
        this.handleNameSave();
      } 
      counter++;
    }
  }

  handleBabyName = (e) => {
    this.setState({baby_name: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if(/^[0-9]+$/gi.test(`${this.state.baby_name}`) === true) {
      return this.setState({
        baby_name: '',
        name_params: false
      })
    }
    this.checkBabyName();
  }
    
  render() {
    return (
      <div>
        { this.state.list ? <h1>*{this.state.list.list_name}*</h1>: null }
        <form>
          <h5>Add Baby Name:</h5>
          { this.state.name_params === false ? <h6>Please do not include numbers in your names.</h6>: null }
          <input type='text' value={this.state.baby_name} onChange={this.handleBabyName} />
          <button type="button" onClick={this.handleSubmit}>Submit</button>
        </form>
        <div className='extra-navs'>
          <Link to={`/babynames/${this.props.match.params.userID}`}>|Home|</Link>
        </div>
        <div className='baby-names'>
          {this.state.redirect ? this.displayNames(): this.state.names ? this.displayNames(): null}
        </div>
      </div>
    )
  }
}

export default ListPage;
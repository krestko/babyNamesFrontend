import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NamesAPI from '../api/NamesAPI';
import ListsAPI from '../api/ListsAPI';
import UsersAPI from '../api/UsersAPI';
import '../App.css';
import './ListNamesPage.css'

class ListNamesPage extends Component {
  state = {
    names: null,
    list_teaser: null,
    lists: null
  }

  componentDidMount() {
    NamesAPI.fetchNamesByListID(this.props.match.params.listID)
    .then(json => this.setState({
      names: json
    }))
    UsersAPI.fetchUserByID(this.props.match.params.userID)
    .then((json) => ListsAPI.fetchListByID(json.recently_viewed_list))
    .then(json => this.setState({
      list_teaser: json
    }))
    ListsAPI.fetchLists()
    .then(json => this.setState({
      lists: json
    }))
  }

  handleAllListDisplays = () => {
    let sortedLists = [];
    this.state.lists.map(list => {
      if(this.state.list_teaser.list_name !== list.list_name) {
        list.list_name = list.list_name.toUpperCase();
        sortedLists.push(list)
    }})
    sortedLists.sort((a, b) => {
      let A = a.list_name;
      let B = b.list_name;
      return (A < B) ? -1: (A > B) ? 1: 0;
    });
    return sortedLists.map((list, index) => {
      return (
        <div key={index}>
          <Link className='baby-name' to={`/babynames/${this.props.match.params.userID}/lists/${list.id}`}>{list.list_name.toLowerCase()}</Link>
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        <h1>Baby Name Lists</h1>
        <h5>Recently visited...</h5>
        <div className='list-teaser'>
          { this.state.list_teaser ? <Link style={{color: '#ccddff', fontWeight: 'bold'}} to={`/babynames/${this.props.match.params.userID}/lists/${this.state.list_teaser.id}`}>*{this.state.list_teaser.list_name}*</Link>: null }
        </div>        
          <div className='extra-navs'>
            <Link to={`/babynames/${this.props.match.params.userID}`}>|New List|</Link>
          </div>
        <div className='baby-names'>
          { this.state.lists && this.state.list_teaser ? this.handleAllListDisplays(): null }
        </div>
      </div>
    )
  }
}

export default ListNamesPage;
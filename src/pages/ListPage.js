import React, { Component } from 'react';
import ListsAPI from '../api/ListsAPI';
import ListDisplay from '../components/ListDisplay/ListDisplay';
import '../App.css';
import './ListNamesPage.css'

class ListPage extends Component {
  state = {
    lists: null,
    listID: null
  }

  componentDidMount() {
    ListsAPI.fetchLists()
    .then(json => this.setState({ 
      lists: json,
      listID: this.props.match.params.listID
    }))
  }
    
  render() {
    if(this.state.listID && this.state.lists) {
      return <ListDisplay lists={this.state.lists} listID={this.state.listID} />
    }
    return (
      <div>
      </div>
    )
  }
}

export default ListPage;
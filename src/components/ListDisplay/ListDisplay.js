import React, { Component } from 'react';
import NameForm from '../NameForm/NameForm';
import ListsAPI from '../../api/ListsAPI';
import '../../App.css';
import '../../pages/ListNamesPage.css'

class ListNamesPage extends Component {
  state = {
    list: null
  }

  componentDidMount() {
    return this.props.lists.map(list => {
      if(list.list_name === this.props.listID)
        return ListsAPI.fetchListByID(list.id)
        .then(json => this.setState({ list: json }))
    })
  }

  render() {
    if(this.state.list) {
      return (
        <div className='App'>
          <h1>List:</h1>
          <div>
            <NameForm list={this.state.list} />
          </div>
        </div>
      )
    }

    return (
      <div>
      </div>
    )
  }
}

export default ListNamesPage;
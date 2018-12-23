import React, { Component } from 'react';
import AlphabeticDisplay from '../AlphabeticDisplay/AlphabeticDisplay';
import LengthDisplay from '../LengthDisplay/LengthDisplay';
import NamesAPI from '../../api/NamesAPI';
import '../../App.css';
import '../../pages/ListNamesPage.css'

class NameForm extends Component {
  state = {
    names: null,
    baby_name: '',
    redirect: null,
    name_params: null,
    toggle_sort: null
  }

  componentDidMount() {
    return NamesAPI.fetchNamesByListID(this.props.list.id)
      .then(json => this.setState({ names: json }))
  }

  handleNameSave = () => {
    NamesAPI.addListName(this.props.list.id, {baby_name: this.state.baby_name, crossed_out: 'false'})
    .then(() => NamesAPI.fetchNamesByListID(this.props.list.id))
    .then(json => 
      this.setState({
        names: json,
        baby_name: '',
        redirect: null,
        name_params: null,
    }))
  }

  checkBabyName = () => {
    if(this.state.names.length === 0) {
      this.handleNameSave();
    } else {
      let counter = 0;
      while(counter < this.state.names.length) {
        if(this.state.names[counter].baby_name.toUpperCase() === this.state.baby_name.toUpperCase()) {
          this.setState({
            baby_name: '',
            redirect: true
          })
          break;
        } else if(counter === this.state.names.length - 1) {
          this.handleNameSave();
        } 
        counter++;
      }
    }
  }

  handleBabyName = (e) => {
    this.setState({baby_name: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if(/[0-9]+/gi.test(this.state.baby_name) === true) {
      return this.setState({
        baby_name: '',
        name_params: false
      });
    }
    this.checkBabyName();
  }

  handleCrossOut = (nameID) => {
    NamesAPI.updateName(this.props.list.id, nameID, {crossed_out: 'true'})
    .then(() => NamesAPI.fetchNamesByListID(this.props.list.id))
    .then(json => this.setState({ names: json }))
  }

  handleUncross = (nameID) => {
    NamesAPI.updateName(this.props.list.id, nameID, {crossed_out: 'false'})
    .then(() => NamesAPI.fetchNamesByListID(this.props.list.id))
    .then(json => this.setState({ names: json }))
  }

  displayNames = () => {
    return this.state.names.map((name, index) => {
      if(name.crossed_out === 'false') {
        return (
          <div key={index} onClick={() => this.handleCrossOut(name.id)}>
            <a className='baby-name'>
              {name.baby_name.toUpperCase()}        
            </a>
          </div>
        )
      } else {
        return (
          <div key={index}>
            <a className='baby-name' onClick={() => this.handleUncross(name.id)} style={{textDecoration: 'line-through'}}>
              {name.baby_name.toUpperCase()}        
            </a>
          </div>
        )
      }
    })
  }

  sortNamesAlphabetical = () => {
    this.setState({ toggle_sort: true })
  }

  sortNamesLength = () => {
    this.setState({ toggle_sort: false })
  }

  saveSortedNames = (x) => {
    this.setState({ 
      names: x,
      toggle_sort: null
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h5>Add Baby Name:</h5>
          <input type='text' value={this.state.baby_name} onChange={this.handleBabyName} />
          <button type='submit'>Submit</button><br/>
          <a type='button' onClick={this.sortNamesAlphabetical}>|Alphabetical|</a>
          <a type='button' onClick={this.sortNamesLength}>|Length|</a>
          { this.state.name_params === false ? <h6>Please do not include numbers in your names.</h6>: null }
          { this.state.redirect === true ? <h6>Name already included in list.</h6>: null }
        </form>

        <div className='baby-names'>
          { this.state.toggle_sort === true ? <AlphabeticDisplay names={this.state.names} list={this.props.list} saveSortedNames={this.saveSortedNames} />: this.state.toggle_sort === false ? <LengthDisplay names={this.state.names} list={this.props.list} saveSortedNames={this.saveSortedNames} />: this.state.names && this.state.toggle_sort === null ? this.displayNames(): null}
        </div>
      </div>
    )
  }
}

export default NameForm;
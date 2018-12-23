import React, { Component } from 'react';
import '../../App.css';
import '../../pages/ListNamesPage.css'

class LengthDisplay extends Component {

  handleAllNamesDisplay = () => {
    let sortedNames = [];
    this.props.names.map(name => {
        sortedNames.push(name)
    })
    sortedNames.sort((a, b) => {
      let A = a.baby_name.length;
      let B = b.baby_name.length;
      return (A < B) ? -1: (A > B) ? 1: 0;
    });
    return this.props.saveSortedNames(sortedNames);
  }

  render() {
    return (
      <div>
        {this.handleAllNamesDisplay()}
      </div>
    )
  }
}

export default LengthDisplay;
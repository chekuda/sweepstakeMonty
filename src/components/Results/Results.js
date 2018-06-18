import React, { Component } from 'react';

import Tables from '../Tables/Table'

import './Results.css'

class Results extends Component {
  constructor(props){
    super(props)
    this.state = {
      results: []
    }
  }

  saveResults = (matches) => {
    const allResults = (matches.msg || []).map(match => match.total)

    this.setState({
      results: allResults
    })
  }

  getMatches(){
    fetch('http://localhost:5000/api/results')
    .then(res => res.json())
    .then(data => this.saveResults(data))
  }

  componentDidMount() {
    this.getMatches()
  }

  render() {
    return <Tables values={this.state.results}/>
  }
}

export default Results

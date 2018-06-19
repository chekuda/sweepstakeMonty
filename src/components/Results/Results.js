import React, { Component, Fragment } from 'react';

import Tables from '../Tables/Table'
import SearchBar from '../SearchBar/SearchBar'

import './Results.css'

class Results extends Component {
  constructor(props){
    super(props)
    this.state = {
      results: [],
    }
  }

  saveResults = (matches) => {
    const allResults = (matches.msg || []).map(match => match.total)

    this.setState({
      results: allResults,
      resultToShow: allResults
    })
  }

  getMatches(){
    const apiRequest = process.env.REACT_APP_PROD ? '/api/results' : 'http://localhost:5000/api/results'

    fetch(apiRequest)
    .then(res => res.json())
    .then(data => this.saveResults(data))
  }

  componentDidMount() {
    this.getMatches()
  }

  onSearchTermChange = (filter) => {
    const newUserBets = this.state.results.filter(bet => bet.join('.').includes(filter))
    this.setState({
      resultToShow: newUserBets
    })
  }

  render() {
    return (
      <Fragment>
        <SearchBar onSearchTermChange={this.onSearchTermChange} />
        <Tables values={this.state.resultToShow}/>
      </Fragment>
    )
  }
}

export default Results

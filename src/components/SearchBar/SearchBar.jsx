import React, { Component } from 'react'
import './SearchBar.css'

class SearchBar extends Component {
  constructor(props){
    super(props)

    this.state = { term: '' }
  }
  onInputChange(term) {
    const rightFormatTerm = term.charAt(0).toUpperCase() + term.slice(1)

    this.setState({ term: rightFormatTerm })
    this.props.onSearchTermChange(rightFormatTerm)
  }
  render() {
    return (
      <div className="search-bar">
        <input
          value={ this.state.term }
          onChange={ ({ target }) => this.onInputChange(target.value) }
          placeholder="Filter by team"
        />
      </div>
    )
  }
}

export default SearchBar
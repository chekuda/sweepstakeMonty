import React, { Component } from 'react';

import ListOfBets from '../ListOfBets/ListOfBets'
import Results from '../Results/Results'
import Nav from '../Nav/Nav'
import Calification from '../Calification/Calification'
import './App.css'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      users: [],
      isOpen: false,
      contentType: 'calification'
    }
  }

  saveBets = (data) => {
    window.BETS = data
    this.setState({
      users: data
    })
  }

  getUserResults(){
    fetch('http://localhost:5000/api/getbets')
    .then(res => res.json())
    .then(data => this.saveBets(data))
  }

  componentDidMount() {
    this.getUserResults()
  }

  setContent = (contentType) => {
    this.setState({
      contentType: contentType
    })
  }

  render() {
    return (
      <div className="App">
        <Nav contentType={this.state.contentType} setContent={this.setContent}/>
        {
          this.state.contentType === 'allbets' && <ListOfBets users={this.state.users}/>
        }
        {
          this.state.contentType === 'results' && <Results />
        }
        {
          this.state.contentType === 'calification' && <Calification users={this.state.users}/>
        }
      </div>
    );
  }
}

export default App;

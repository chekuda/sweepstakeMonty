import React, { Component } from 'react';

import Tables from '../Tables/Table'
import bets from '../../allBets/bets'
import results from '../../results/results'
import Navigator from '../Navigator/Navigator'
import Nav from '../Nav/Nav'
import './App.css'

const SPECIALCHARS = {
  ['á']: 'a',
  ['é']: 'e',
  ['í']: 'i',
  ['ó']: 'o',
  ['ú']: 'u',
  ['ñ']: 'n'
  }

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      users: []
    }
  }


  // RESULTS.reduce((acc, result) => {
  //   return acc.concat(ALLUSERS.map(user => bets.find(bet => bet.includes(result[0], result[3]))))
  // }, [])

  getCalification(allUsers){
    window.ALLUSERS = allUsers
  }

  componentDidMount() {
    const allUsers = bets().reduce((acc, ele) => {
      return acc.concat({
        user: ele.user,
        bets: ele.bets.map(bet => this.cleanUpSpecialChars(bet))
      })
    }, [])

    this.getCalification(allUsers)

    this.setState({
      users: allUsers
    })
  }

  cleanUpSpecialChars(user){
    return user.map(ele =>
        typeof ele === 'string'
          ? ele.replace(/[á|é|í|ó|ú|ñ]/g, (m) => SPECIALCHARS[m]).replace(/ /g, '').toLocaleLowerCase()
          : ele)
  }
  render() {
    console.log(this.state.users)
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">SweepStake 2018</h1>
          {
            this.state.calification &&
            <Tables values={this.state.calification}/>
          }
        </header>
        <Navigator users={this.state.users}/>
      </div>
    );
  }
}

export default App;

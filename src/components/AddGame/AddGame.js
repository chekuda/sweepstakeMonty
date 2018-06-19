import React, { Component, Fragment} from 'react'
import { Button, Alert} from 'reactstrap'

import './AddGame.css'

class Results extends Component {
  constructor(props){
    super(props)
    this.state = {
      teams: ['', ''],
      score: ['', ''],
      listOfTeams: ["Russia", "Egypt", "Uruguay", "Saudi Arabia", "Portugal", "Morocco", "Iran", "Spain", "France", "Peru", "Denmark", "Australia", "Argentina", "Croatia", "Nigeria", "Iceland", "Brazil", "Costa Rica", "Serbia", "Switzerland", "Germany", "Sweden", "South Korea", "México", "Belgium", "Tunisia", "England", "Panama", "Poland", "Colombia", "Japan", "Senegal"],
      listOfGoals: [1,2,3,4,5,6,7,8,9,10]
    }
  }

  setAlert = (response) => {
    this.setState({
      alert: {
        color: response.success ? 'success' : 'danger',
        msg: response.msg
      }
    })
  }

  sendInfo = () => {
    const parseScore = this.state.score.map(ele => parseInt(ele, 10))
    const apiRequest = process.env.REACT_APP_PROD ? '/api/updateResults' : 'http://localhost:5000/api/updateResults'

    fetch(apiRequest, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ teams: this.state.teams, result: parseScore })
    })
    .then(res => res.json())
    .then(data => this.setAlert(data))
  }

  isEnabled() {
    const fullfilled = [this.state.teams, this.state.score].map(section => section.every(team => team))
    return fullfilled.some(ele => !ele)
  }

  currentValue = ({ target }, section, pos) => {
    this.setState({
      [section]: pos === 1 ? [this.state[section][0], target.value] : [target.value, this.state[section][1]]
    })
  }
  render() {
   return (
    <Fragment>
      <div className="header">
        Add a new result
      </div>
      <div className="content">
        <div className="blockTeam">
          <div className="team">
          <label className="label-name">
            Team
          </label>
          <select onChange={event => this.currentValue(event, 'teams', 0)} value={this.state.teams[0]} >
            <option value=""></option>
            {
              this.state.listOfTeams.map((team, index) => {
                return (<option key={index} value={team}>{team}</option>)
              })
            }
          </select>
          </div>
          <div className="score">
          <label className="label-name">
            Score
          </label>
          <select onChange={event => this.currentValue(event, 'score', 0)} value={this.state.score[0]} >
            <option value=""></option>
            {
              this.state.listOfGoals.map((goal, index) => {
                return <option key={index} value={goal}>{goal}</option>
              })
            }
          </select>
          </div>
        </div>
        <div className="blockTeam">
          <div className="team">
            <label className="label-name">
              Team
            </label>
            <select onChange={event => this.currentValue(event, 'teams', 1)} value={this.state.teams[1]} >
              <option value=""></option>
              {
                this.state.listOfTeams.map((team, index) => {
                  return (<option key={index} value={team}>{team}</option>)
                })
              }
            </select>
          </div>
          <div className="score">
          <label className="label-name">
            Score
          </label>
          <select onChange={event => this.currentValue(event, 'score', 1)} value={this.state.score[1]} >
            <option value=""></option>
            {
              this.state.listOfGoals.map((goal, index) => {
                return <option key={index} value={goal}>{goal}</option>
              })
            }
          </select>
          </div>
        </div>
      </div>
      <div className="send-info">
        <Button color="primary" onClick={this.sendInfo} disabled={this.isEnabled()}>Send</Button>
      </div>
      <div className="alert-section">
        {
          this.state.alert &&
          <Alert color={this.state.alert.color}>
            { this.state.alert.color === 'danger'
              ? this.state.alert.msg
              : <ul>
                {
                  this.state.alert.msg.map(user =>
                    <li> user: {user.user}, points: {user.points} </li>
                  )
                }
                </ul>
            }
          </Alert>
        }
      </div>
    </Fragment>
   )
  }
}

export default Results

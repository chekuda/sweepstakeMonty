import React, { Component, Fragment} from 'react';

class Results extends Component {
  constructor(props){
    super(props)
    this.state = {
      value: undefined,
      listOfTeams: ["Russia", "Egypt", "Uruguay", "Saudi Arabia", "Portugal", "Morocco", "Iran", "Spain", "France", "Peru", "Denmark", "Australia", "Argentina", "Croatia", "Nigeria", "Iceland", "Brazil", "Costa Rica", "Serbia", "Switzerland", "Germany", "Sweden", "South Korea", "México", "Belgium", "Tunisia", "England", "Panama", "Poland", "Colombia", "Japan", "Senegal"],
      listOfGoals: [1,2,3,4,5,6,7,8,9,10]
    }
  }


  currentValue = ({ target }) => {
    this.setState({
      value: target.value
    })
  }
  render() {
   return (
    <Fragment>
      <div className="blockTeam">
        <div className="team">
        <select onChange={event => this.currentValue(event)} value={this.state.value} >
          <option value=""></option>
          {
            this.state.listOfTeams(team => {
              return (<option value={team}>{team}</option>)
            })
          }
        </select>
        </div>
        <div className="score">
        </div>
      </div>
      <div className="blockTeam">
        <div className="team"></div>
        <div className="score"></div>
      </div>
    </Fragment>
   )
  }
}

export default Results

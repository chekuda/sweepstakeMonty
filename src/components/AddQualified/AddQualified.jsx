import React, { Component, Fragment} from 'react'
import { Collapse, Button, CardBody, Card, Alert, ListGroup, ListGroupItem } from 'reactstrap'

import './AddQualified.css'

const ALLTEAMS = ["Argentina", "Australia", "Belgium", "Brazil", "Colombia", "Costa Rica", "Croatia", "Denmark", "Egypt", "England", "France", "Germany", "Iceland", "Iran", "Japan", "Morocco", "México", "Nigeria", "Panama", "Peru", "Poland", "Portugal", "Russia", "Saudi Arabia", "Senegal", "Serbia", "South Korea", "Spain", "Sweden", "Switzerland", "Tunisia", "Uruguay"]

class AddQualified extends Component {
  constructor(props){
    super(props)
    this.thisYear = new Date().getFullYear() // Change this to check other year
    this.state = { collapse: undefined, section: [], data: [], dataRetrieved: {} }
    this.sections = [
      { allTeams: 'All Teams'},
      { gSixteen: 'Round of Sixteen'},
      { qFinal: 'Quarter final'},
      { semifinals: 'Semifinals'},
      { final: 'Final'},
      { winner: 'Winner'},
    ]
  }

  setAlert = (response) => {
    this.setState({
      alert: {
        color: response.success ? 'success' : 'danger',
        msg: response.msg
      },
      data: [],
      section: []
    })
  }

  toggle = (val) => {
    val = this.state.collapse === val ? undefined : val
    this.setState({ collapse: val });
  }

  sendInfo = () => {
    const apiRequest = process.env.REACT_APP_PROD ? '/api/updatedqualified' : 'http://localhost:5000/api/updatedqualified'

    fetch(apiRequest, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ year: this.thisYear, round: this.state.section, data: this.state.data })
    })
    .then(res => res.json())
    .then(data => {
      this.retrieveData()
      this.setAlert(data)
    })
  }

  handleResponse = (res) => {
    if(!res.success) {
      this.setAlert(res)
    } else {
      this.setState({
        dataRetrieved: res.msg
      })
    }
  }

  retrieveData = () => {
    const apiRequest = process.env.REACT_APP_PROD ? '/api/getqualified' : 'http://localhost:5000/api/getqualified'

    fetch(apiRequest, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ year: this.thisYear })
    })
    .then(res => res.json())
    .then(data => this.handleResponse(data))
  }

  componentDidMount() {
    this.retrieveData()
  }

  handleClick = (section, team) => {
    const { data } = this.state

    if(section === this.state.section) {
      this.setState({
        section,
        data: data.includes(team) ? data.filter(t => t !== team) : data.concat(team)
      })
    } else {
      this.setState({
        section,
        data: [].concat(team)
      })
    }
  }

  renderRightData(section, backUpSection) {
    const data = this.state.dataRetrieved[section]
    const backUpData = this.state.dataRetrieved[backUpSection]

    if(data && data.length > 0){
      return data
    } else if(backUpData && backUpData.length > 0){
      return backUpData
    }
    return ALLTEAMS
  }

  render() {
   return (
    <Fragment>
      <div className="header">
        Add a qualified
      </div>
      <ListGroup>
        {
          this.sections.map((sec, index) => {
            const secKey = Object.keys(sec)[0]
            const backUpSection = index > 0 && Object.keys(this.sections[index -1])[0]
            return (
              <Fragment key={index}>
                <ListGroupItem onClick={() => this.toggle(secKey)}>{sec[secKey]}</ListGroupItem>
                <Collapse isOpen={this.state.collapse === secKey}>
                  <Card>
                    <CardBody>
                      {
                        this.renderRightData(secKey, backUpSection).map((team,i) =>
                          <Button
                            key={i}
                            onClick={() => this.handleClick(secKey, team)}
                            color={this.state.section === secKey && this.state.data.includes(team) ? 'success' : 'secondary'}>
                            {team}
                          </Button>
                        )
                      }
                       <div className='sendData'>
                        <Button color='primary sendButton' onClick={this.sendInfo}>Send</Button>
                      </div>
                    </CardBody>
                  </Card>
                </Collapse>
              </Fragment>
            )
          })
        }
        <ListGroupItem>Golden Boot</ListGroupItem>
        <ListGroupItem>Best Player</ListGroupItem>
      </ListGroup>
      <div className="alert-section">
        {
          this.state.alert &&
          <Alert color={this.state.alert.color}>
            { this.state.alert.color === 'danger'
              ? this.state.alert.msg
              : <ul>
                {
                  this.state.alert.msg.map((user, i) =>
                    <li key={i}> user: {user.user}, oldPoints: {user.oldPoints}, newPoints: {user.updated} </li>
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

export default AddQualified

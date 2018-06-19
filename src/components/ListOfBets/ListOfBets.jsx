import React, { Component, Fragment } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap'
import classnames from 'classnames'
import Tables from '../Tables/Table'
import SearchBar from '../SearchBar/SearchBar'

import './ListOfBets.css'

export default class Navigator extends Component {
  constructor(props) {
    super(props)
    this.state={
      users: this.props.users
    }
  }

  toggle = (tab) =>{
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }
  componentDidMount(){
    this.setState({
      isMobile: window && window.innerWidth <= 414
    })
  }

  onSearchTermChange = (filter) => {
    const newUserBets = this.props.users.reduce((acc, user) => {
      return acc.concat({
        user: user.user,
        bets: user.bets.filter(bet => bet.join('.').includes(filter))
      })
    }, [])
    this.setState({
      users: newUserBets
    })
  }
  render() {
    return (
      <Fragment>
        <SearchBar onSearchTermChange={this.onSearchTermChange} />
        <Nav tabs className="nav-component">
          {
            this.props.users.map((user, index) => {
              return (
                <NavItem key={index}>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === user.user })}
                    onClick={() => { this.toggle(user.user) }}
                  >
                    {this.state.isMobile ? user.user[0] : user.user}
                  </NavLink>
                </NavItem>
              )
            })
          }
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          {
            this.state.users.map((user, index) => {
              return (
                <TabPane key={index} tabId={user.user}>
                  <Tables values={user.bets} />
                </TabPane>
              )
            })
          }
        </TabContent>

      </Fragment>
    )
  }
}
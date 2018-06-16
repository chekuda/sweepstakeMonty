import React, { Component, Fragment } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap'
import classnames from 'classnames'
import Tables from '../Tables/Table'

import './Navigator.css'

export default class Navigator extends Component {
  constructor(props) {
    super(props)
    this.state={}
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
  render() {
    return (
      <Fragment>
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
            this.props.users.map((user, index) => {
              return (
                <TabPane key={index} tabId={user.user}>
                  <Tables values={user.bets}/>
                </TabPane>
              )
            })
          }
        </TabContent>

      </Fragment>
    )
  }
}
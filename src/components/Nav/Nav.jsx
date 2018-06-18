import React, { Component, Fragment } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap'

import './Nav.css'


export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    }
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  setActiveClass(currentTab) {
    return this.props.contentType === currentTab ? 'active': ''
  }
  render() {
    return (
      <div className="top-nav-bar">
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Sweepstake2018</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink className={this.setActiveClass('allbets')} onClick={() => this.props.setContent('allbets')}>AllBets</NavLink>
            </NavItem>
            <NavItem>
              <NavLink  className={this.setActiveClass('results')} onClick={() => this.props.setContent('results')}>Results</NavLink>
            </NavItem>
            <NavItem>
              <NavLink  className={this.setActiveClass('calification')} onClick={() => this.props.setContent('calification')}>Calification</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
    )
  }
}
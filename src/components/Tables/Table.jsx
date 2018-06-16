import React, { Component } from 'react';
import { Table } from 'reactstrap';

export default class Example extends Component {
  render() {
    return (
      <Table striped>
        {
        this.props.header &&
          <thead>
            <tr>
              <th>#</th>
              <th>{this.props.header.name}</th>
              <th>{this.props.header.points}</th>
            </tr>
          </thead>
        }
        <tbody>
          {
            (this.props.values || []).map((val, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index}</th>
                  {
                    val.map((ele, i) => <td key={i}>{ele}</td>)
                  }
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    );
  }
}
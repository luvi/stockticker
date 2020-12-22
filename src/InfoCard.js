import React, { Component } from "react";
import { Card } from "react-bootstrap";

export default class InfoCard extends Component {
  render() {
    return (
      <>
        <Card style={{ width: "18rem", padding: "1rem", border:"0px" }}>
          <Card.Title style={{ fontStyle: "bold",fontWeight: "200" }}> {this.props.title}</Card.Title>
          <Card.Text>{this.props.text} </Card.Text>
        </Card>
      </>
    );
  }
}

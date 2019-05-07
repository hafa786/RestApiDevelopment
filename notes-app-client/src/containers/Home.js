import React, { Component } from "react";
import { PageHeader, ListGroup ,ListGroupItem} from "react-bootstrap";
import "./Home.css";
import { API } from "aws-amplify";

import { LinkContainer } from "react-router-bootstrap";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      users: []
    };
  }
  async componentDidMount() {
    // if (!this.props.isAuthenticated) {
    //   return;
    // }
  
    try {
      const users = await this.users();
      this.setState({ users });
    } catch (e) {
      console.log(e);
    }
  
    this.setState({ isLoading: false });
  }
  
  users() {
    return API.get("users", "/users");
  }
  

  renderUsersList(users) {
      console.log(users);
    // return [{}].concat(users).map(
    //   (user, i) =>
    //     i !== 0
    //       ? <LinkContainer
    //           key={user.userid}
    //         >
    //           <ListGroupItem header={user.content.trim().split("\n")[0]}>
    //             {"Created: " + new Date(user.createdAt).toLocaleString()}
    //           </ListGroupItem>
    //         </LinkContainer>
    //       : <LinkContainer
    //           key="new"
    //           to="/notes/new"
    //         >
    //           <ListGroupItem>
    //             <h4>
    //               <b>{"\uFF0B"}</b> Create a new note
    //             </h4>
    //           </ListGroupItem>
    //         </LinkContainer>
    // );
  }
  

  renderLander() {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p>A simple note taking app</p>
      </div>
    );
  }

  renderUsers() {
    return (
      <div className="users">
        <PageHeader>Your Notes</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderUsersList(this.state.notes)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.renderUsers()}
      </div>
    );
  }
}

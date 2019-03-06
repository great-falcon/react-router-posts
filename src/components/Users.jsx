import React, { Component } from "react";
import { Link } from "react-router-dom";
import { makeRequest } from '../requestFunction';

class Users extends Component {
  state = {
    users: []
  }

  async componentDidMount() {
    const users = await makeRequest('/users');
    this.setState({ users });
  }

  render() {
    const { users } = this.state;
    return (
      <div>
        <button onClick={this.props.history.goBack}>Back</button>
        <h2>Users:</h2>
        <ul className="users">
          {users.map(({ id, name }) => (
            <li key={id}>
              <Link to={`/users/${id}/posts`}>{name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Users;

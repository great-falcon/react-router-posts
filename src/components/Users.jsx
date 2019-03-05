import React, { Component } from "react";
import { Link } from "react-router-dom";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <h2>Users:</h2>
        <ul className="users">
          {data.map(({ id, name }) => (
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

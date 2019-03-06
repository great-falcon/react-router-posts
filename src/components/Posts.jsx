import React, { Component } from "react";
import { Link } from "react-router-dom";
import { makeRequest } from "../requestFunction";

class Posts extends Component {
  state = {
    posts: []
  };

  getAllPosts = async () => {
    const posts = await makeRequest("/posts");
    this.setState({ posts });
  };

  getPostsByUser = async () => {
    const posts = await makeRequest(
      `/posts?userId=${this.props.match.params.userId}`
    );
    this.setState({ posts });
  };

  componentDidMount() {
    if (this.props.match.params.userId) {
      this.getPostsByUser();
    } else {
      this.getAllPosts();
    }
  }

  render() {
    const { posts } = this.state;
    return (
      <div>
        <button onClick={this.props.history.goBack}>Back</button>
        <h2>Posts:</h2>
        <ul className="posts">
          {posts.map(({ id, title }) => (
            <li key={id}>
              <Link to={`/posts/${id}`}>
                {id} - {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Posts;

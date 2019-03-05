import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.parallelRequests = 5;
    const ids = [];
    for (let i = 0; i < 100; i++) {
      ids.push(i + 1);
    }
    this.state = {
      postIds: ids,
      data: []
    };
    this.getAllPosts = this.getAllPosts.bind(this);
  }
  getAllPosts() {
    let requestIds = this.state.postIds.slice(0, this.parallelRequests);
    this.setState({ postIds: this.state.postIds.slice(5) });
    const promises = requestIds.map(postId =>
      axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    );
    Promise.all(promises).then(data => {
      this.setState({
        data: this.state.data.concat(data.map(val => val.data))
      });
    });
  }

  getPostsByUser() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(posts =>
        this.setState({
          data: posts.filter(
            post => post.userId == this.props.match.params.user
          )
        })
      );
    this.setState({
      postIds: []
    });
    this.setState({
      backButton: (
        <button>
          <Link to="/users">Back</Link>
        </button>
      )
    });
  }
  componentDidMount() {
    if (this.props.match.params.user) {
      this.getPostsByUser();
    } else {
      this.getAllPosts();
    }

    const moreButton = <button onClick={this.getAllPosts}>Load more</button>;
    this.setState({ moreButton });
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        {this.state.backButton}
        <h2>Posts:</h2>
        <ul className="posts">
          {data.map(({ id, title }) => (
            <li key={id}>
              <Link
                to={{
                  pathname: `/posts/${id}`,
                  state: { from: this.props.match.url }
                }}
              >
                {id} - {title}
              </Link>
            </li>
          ))}
        </ul>
        {this.state.postIds.length ? (
          this.state.moreButton
        ) : (
          <p>This is all poosts</p>
        )}
      </div>
    );
  }
}

export default Posts;

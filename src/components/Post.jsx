import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

class Post extends Component {
  state = {
    post: {},
    comments: []
  };
  componentDidMount() {
    console.log(this.props.match);
    const postId = this.props.match.params.id || "";
    this.setState({
      backButton: (
        <button>
          <Link to={this.props.location.state.from}>Back</Link>
        </button>
      )
    });
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(res => res.json())
      .then(data =>
        this.setState({
          post: data
        })
      );
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then(response => response.json())
      .then(data =>
        this.setState({
          comments: data.filter(
            comment => comment.postId == this.props.match.params.id
          )
        })
      );
  }
  render() {
    const { post } = this.state;
    const { comments } = this.state;
    // const { title, body } = post;
    return (
      <Fragment>
        {this.state.backButton}
        <h1>Post</h1>
        <h2>{post.title}</h2>
        <p>{post.body}</p>

        <ul className="comments">
          {comments.map(({ id, name, email, body }) => (
            <li key={`c-${id}`}>
              <h3>Comment:</h3>
              <h4>{name}</h4>
              <a href={`mailto:${email}`}>{email}</a>
              <p>{body}</p>
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }
}

export default Post;

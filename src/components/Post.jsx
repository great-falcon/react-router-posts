import React, { Component, Fragment } from "react";
import { makeRequest } from '../requestFunction';

class Post extends Component {
  state = {
    post: {},
    comments: []
  };

  async componentDidMount() {
    const postId = this.props.match.params.postId || "";

    const post = await makeRequest(`/posts/${postId}`);

    const comments = await makeRequest(`/comments?postId=${postId}`);
    this.setState({
      post,
      comments
    });


  }
  render() {
    const { post, comments } = this.state;
    return (
      <Fragment>
        <button onClick={this.props.history.goBack}>Back</button>
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

import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Posts from "./Posts";
import Users from "./Users";
import Post from "./Post";

class AppRouter extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <h1>
            <Link to="/">Logo</Link>
          </h1>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/posts/" component={Posts} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/users/:user/posts" component={Posts} />
            <Route path="/posts/:id/" component={Post} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <ul>
        <li>
          <Link to="/posts/">Show all posts</Link>
        </li>
        <li>
          <Link to="/users">Show users</Link>
        </li>
      </ul>
    </div>
  );
}

export default AppRouter;

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Stock from "./pages/Stock";

ReactDOM.render(
  <Router>
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/">
            <Stock />
          </Route>
        </Switch>
      </div>
    </div>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
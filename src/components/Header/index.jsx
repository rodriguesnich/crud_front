import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function Header() {
  return (
    <Router>
      <header className="myNav navbar navbar-secondary bg-dark mb-4 text-light">
        <div className="container-fluid">
          <Link className="navbar-brand mb-0 h1" to="/">
          TBP
          </Link>
          <Link className="btn btn-outline-primary me-2" to="/stock">
            Preços
          </Link>
        </div>
      </header>
    </Router>
  );
}

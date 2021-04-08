import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function Header() {
  return (
    <Router>
      <header className="myNav navbar navbar-secondary bg-dark mb-4 text-light">
        <div className="container-fluid">
          <Link className="navbar-brand mb-0 h1" to="/">
          My_Brand
          </Link>
          <Link className="btn btn-outline-primary me-2" to="/stock">
            Estoque
          </Link>
          <button className="btn btn-outline-primary me-2" type="button">
            Venda
          </button>
          <button className="btn btn-outline-primary me-2" type="button">
            Finaças
          </button>
          <span className="navbar-brand mb-0 h1">Nicholas</span>
        </div>
      </header>
    </Router>
  );
}

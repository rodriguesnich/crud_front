import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

import Login from "./pages/Login";
import Prices from "./pages/Prices";

export default function BasicExample() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    console.log(user);
  },[user])

  return (
    <Router>
      <div>     
         <header className="myNav navbar navbar-secondary bg-dark mb-4 text-light">
        <div className="container-fluid">
          <Link className="navbar-brand mb-0 h1" to="/">
          TBP
          </Link>
          {/* <Link className="btn btn-outline-primary me-2" to="/prices">
            Preços
          </Link> */}
        </div>
      </header>

        <Switch>
          <Route exact path="/">
             {loggedIn ? <Prices user={user} /> : <Login setUser={setUser} setLoggedIn={setLoggedIn} /> }
          </Route>
          {/* <Route path="/prices">
            <Prices user={user} />
          </Route> */}
          {/* <Route path="/about">
            <About />
          </Route> */}
        </Switch>
      </div>
    </Router>
  );
}

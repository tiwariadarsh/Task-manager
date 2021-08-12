import "./App.css";
import React, { useState, useEffect } from "react";
import Navbarx from "./components/Navbar";
import Todos from "./components/Todos";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/About";
import Login from "./components/Login";
import Complete from "./components/Complete";
import Signup from "./components/Signup";

export default function App() {
  let intitial1;
  const [mw,setMw] = useState(false);
  if (localStorage.getItem("com") === null) {
    intitial1 = [];
  } else {
    intitial1 = JSON.parse(localStorage.getItem("com"));
  }
  const [com, setCom] = useState(intitial1);
  useEffect(() => {
    localStorage.setItem("com", JSON.stringify(com));
  }, [com]);

  return (
    <div>
      <Router>
        <Navbarx title="Task-Manager" />
        <Switch>
       
          <Route exact path="/">
            <Todos setCom={setCom} com={com} mw={mw} />
          </Route>
                   
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/login">
            <div className="d-flex justify-content-center align-item-center mt-5">
              <Login mw={mw} setMw={setMw}/>
            </div>
          </Route>
          <Route exact path="/complete">
            <Complete com={com} setCom={setCom} />
          </Route>
          <Route exact path="/signup">
            <div className="d-flex justify-content-center align-item-center mt-5">
              <Signup />
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

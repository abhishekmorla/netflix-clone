// index.js
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import List from "./List";
import Signup from "./Signup";
import SignIn from "./SignIn";
import "./index.css";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/" element={<List />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);

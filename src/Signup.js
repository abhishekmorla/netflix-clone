// Signup.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; // import your Firebase app configuration
import { LockOpen } from "@material-ui/icons";
import "./SignUp.css";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const signupHandler = (e) => {
    e.preventDefault();
    if (password1 === password2) {
      setLoading(true);
      signUpwithEmail();
      setEmail("");
    } else {
      alert("Both passwords didn't match");
    }
    setPassword1("");
    setPassword2("");
  };

  const signUpwithEmail = () => {
    createUserWithEmailAndPassword(auth, email, password1)
      .then((user) => {
        if (user) {
          alert("Account Created");
        }
        setLoading(false);
        navigate("/signin");
      })
      .catch(function (error) {
        setLoading(false);
        //var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <div className="signUp">
      <Link to="/"></Link>
      <div className="signup__container">
        <h1>Sign Up</h1>
        <form onSubmit={signupHandler}>
          <input
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
          />
          <input
            required
            type="password"
            onChange={(e) => setPassword1(e.target.value)}
            value={password1}
            placeholder="Password"
          />
          <input
            required
            type="password"
            onChange={(e) => setPassword2(e.target.value)}
            value={password2}
            placeholder="Confirm Password"
          />
          <button type="submit">Sign Up</button>
        </form>
        <Link to="/signin">
          <LockOpen />
          &nbsp;Sign In
        </Link>
      </div>
    </div>
  );
};

export default Signup;

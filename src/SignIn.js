import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const signinHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    signInwithEmail();
    setEmail("");
    setPassword("");
  };

  const signInwithEmail = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setLoading(false);

        navigate("/");
      })
      .catch(function (error) {
        setLoading(false);
        // Handle Errors here.
        //var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <div className="signIn">
      <div className="signin__container">
        <h1> Sign In </h1>
        <form onSubmit={signinHandler}>
          <input
            value={email}
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            value={password}
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit"> Sign In </button>
        </form>
        <h3>
          New Member ? <Link to="/signup"> Sign up now. </Link>
        </h3>
      </div>
    </div>
  );
}

export default SignIn;

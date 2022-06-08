import React, { useState } from "react";
import { signUp } from "../../store/session";
import { useDispatch } from "react-redux";

import "./SignupForm.css";

function SignupForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const errors = [];

    let emailError;

    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));

      if (data) {
        emailError = data[0].split(":")[1].trimStart();
        errors.push(emailError);
        setErrors(errors);
      }
    } else {
      return setErrors(["Passwords do not match."]);
    }
  };

  return (
    <div className="login-box">
      <form onSubmit={handleSubmit} className="login-form">
        <ul className="error-ul">
          {errors.map((error, idx) => (
            <li key={idx} className="error-li">
              {error}
            </li>
          ))}
        </ul>
        <label className="signup-header">Sign up for Filter</label>
        <div className="user-box">
          <input
            placeholder="Email Address"
            className="signup-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="user-box">
          <input
            placeholder="Userame"
            className="signup-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="user-box">
          <input
            placeholder="Password"
            className="signup-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="user-box">
          <input
            placeholder="Confirm Password"
            className="signup-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="signup-btn">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupForm;

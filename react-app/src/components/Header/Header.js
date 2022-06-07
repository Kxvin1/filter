import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";
import * as sessionActions from "../../store/session";
import logo from "../../logo-images/yelp-500.png";
// import Search from "./Search";

import "./Header.css";

function Header({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());

    history.push("/");
  };

  let defaultLinks;
  let loggedInLinks;
  if (sessionUser) {
    defaultLinks = (
      <>
        {/* <Search /> component goes here */}
        <h2 className="greeting-message-nav">
          Hello, {sessionUser.first_name}!
        </h2>
        <div>
          <button className="logout-button" onMouseDown={logout}>
            <i className="fas fa-sign-out-alt"></i>
            <span className="logout-text">Log Out</span>
          </button>
        </div>
      </>
    );

    loggedInLinks = (
      <ul>
        <li className="nav-button">
          <NavLink activeClassName="active-link" exact to="/">
            Home
          </NavLink>
        </li>
        <li className="favorites-nav nav-button">
          <NavLink activeClassName="active-link" to={`/businesses/new`}>
            Add a Business: redirects to a business form page
          </NavLink>
        </li>
        <li className="favorites-nav nav-button">
          <NavLink activeClassName="active-link" to={`/search`}>
            Write a Review: this redirects them to an empty Search Results Page
          </NavLink>
        </li>
      </ul>
    );
  } else {
    defaultLinks = (
      <>
        {/* make this a button */}
        {/* login button: background is opaque (use rgba), has white borders #fff with white font #ff  --> on hover it turns #E0E0E0 */}
        <li id="login">{/* <LoginFormModal /> */}</li>
        {/* make this a button */}
        {/* signup button: background is red #F40D15, has red borders #fff with white font ##F40D15  --> on hover it turns slightly brighter red (figure out hex in css) */}
        <li id="signup">
          {/* <button id="signup"> */}
          {/* <SignupFormModal /> */}
          {/* </button> */}
        </li>
      </>
    );

    loggedInLinks = <></>;
  }

  return (
    <header>
      <nav className="nav-bar">
        <div className="navbar-element" id="left-container">
          <NavLink exact to="/">
            <img className="home-button" src={logo} alt="logo" />
          </NavLink>
        </div>

        <div className="navbar-element" id="center-container">
          <ul className="links">{isLoaded && loggedInLinks}</ul>
        </div>

        <div className="navbar-element" id="right-container">
          <ul className="links">{isLoaded && defaultLinks}</ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;

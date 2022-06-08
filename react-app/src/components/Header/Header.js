import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignUpFormModal";
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
          Hello, {sessionUser?.username}!
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
            Add a Business
          </NavLink>
        </li>
        <li className="favorites-nav nav-button">
          <NavLink activeClassName="active-link" to={`/search`}>
            Write a Review
          </NavLink>
        </li>
      </ul>
    );
  } else {
    defaultLinks = (
      <>
        <li id="login">
          <LoginFormModal />
        </li>
        <li id="signup">
          <SignupFormModal />
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

import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SignupForm from "../SignUpFormModal/SignupForm";

import "./SplashPage.css";

function Splash() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="parent-div-splash">
      <div className="body-text">
        <h1>Your Next Review Awaits</h1>

        <h3>
          With trusted local business information, photos and review content,
          Filter provides a platform for you to discover and connect with local
          coffee businesses!
        </h3>

        <button className="sign-up-button" onClick={() => setShowModal(true)}>
          Sign Up
        </button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <SignupForm />
          </Modal>
        )}
      </div>

      <ul className="cb-slideshow">
        <li>
          <span className="slideshow-images-splash">First Image</span>
        </li>
        <li>
          <span className="slideshow-images-splash">Second Image</span>
        </li>
        <li>
          <span className="slideshow-images-splash">Third Image</span>
        </li>
        <li>
          <span className="slideshow-images-splash">Fourth Image</span>
        </li>
      </ul>
    </div>
  );
}

export default Splash;

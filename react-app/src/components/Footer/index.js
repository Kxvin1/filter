import React from "react";
import "./Footer.css";
import { useSelector } from "react-redux";

function Footer() {
  const user = useSelector((state) => state?.session?.user);

  let decideView;

  if (!user) {
    decideView = (
      <footer className="footer">
        <ul className="footer-ul">
          <li className="footer-text">
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://github.com/Kxvin1/filter"
              className="white"
            >
              GitHub Repository | Filter 2022
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://github.com/Kxvin1"
            >
              <i className="fab fa-github" />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://www.linkedin.com/in/kevin-bartolome/"
            >
              <i className="fab fa-linkedin" />
            </a>
          </li>
          <li>Google Maps API</li>
          <li>Python</li>
          <li>React</li>
          <li>Redux</li>
          <li>SQLAlchemy</li>
          <li>Flask</li>
          <li>PostgreSQL</li>
          <li>Docker</li>
        </ul>
      </footer>
    );
  } else {
    decideView = <></>;
  }

  return <div>{decideView}</div>;
}

export default Footer;

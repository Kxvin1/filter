import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { useEffect } from "react";

import { getBusinessesThunk } from "../../store/business";

import "./PageNotFound.css";

function PageNotFound() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state?.session?.user);

  //   need this so we can quick search from this component
  useEffect(() => {
    dispatch(getBusinessesThunk());
  }, [dispatch]);

  let decideView;

  if (sessionUser) {
    decideView = (
      <div className="page-not-found-container">
        <div className="page-not-found-stuff">
          <div>
            {/* <h1 className="pnf-h1">FORBIDDEN</h1> */}
            <p className="page-not-found">
              We're sorry. We can't find the page you're looking for.
            </p>
            {/* <p className="login-404-msg">
              Click on the Log In or Sign Up buttons right above to access this
              page!
            </p> */}
            <p className="login-404-msg">
              Here are some helpful links instead:
            </p>
            <div className="pnf-visit-these">
              <span>
                Try Our{" "}
                <Link to="/search/coffee" className="search-404-text">
                  Quick Search
                </Link>
              </span>
              <span>
                Browse{" "}
                <Link to="/" className="search-404-text">
                  Coffee Shops
                </Link>
              </span>
            </div>
          </div>
          <img
            className="img404"
            src="https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_design_cdn/71c11abb895c/assets/img/svg_illustrations/cant_find_650x520_v2.svg"
            alt="404 yelp"
          />
        </div>
      </div>
    );
  } else {
    decideView = (
      <div className="page-not-found-container">
        <div className="page-not-found-stuff">
          <div>
            {/* <h1 className="pnf-h1">FORBIDDEN</h1> */}
            <p className="page-not-found">
              We're sorry. We can't find the page you're looking for.
            </p>
            <p className="login-404-msg">
              Click on the Log In or Sign Up buttons right above to access this
              page!
            </p>
            <div className="pnf-visit-these">
              <span>
                Back to{" "}
                <Link to="/" className="search-404-text">
                  Home Page
                </Link>
              </span>
            </div>
          </div>
          <img
            className="img404"
            src="https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_design_cdn/71c11abb895c/assets/img/svg_illustrations/cant_find_650x520_v2.svg"
            alt="404 yelp"
          />
        </div>
      </div>
    );
  }

  return <div>{decideView}</div>;
}

export default PageNotFound;

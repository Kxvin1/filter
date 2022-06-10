import { useHistory } from "react-router-dom";

import "./Banner.css";
import { useState } from "react";

function Banner() {
  const [search, setSearch] = useState("");
  const history = useHistory();

  const handleForm = async (e) => {
    e.preventDefault();

    if (search.length > 0) {
      history.push(`/search/${search}`);
    } else {
      history.push(`/`);
    }
  };
  return (
    <div className="banner-container">
      <div className="banner-content">
        <div className="banner-logo-container">
          {/* Search Bar Container don't delete this div*/}
        </div>
        <div className="banner-form-container">
          <form className="banner-search">
            <label htmlFor="search">
              <input
                type="text"
                className="banner-search-input"
                autoComplete="off"
                id="search"
                placeholder="Search Coffee Shops"
                maxLength="50"
                value={search}
                required
                onChange={(e) => setSearch(e.target.value)}
              ></input>
            </label>

            <button className="banner-submit" onClick={handleForm}>
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Banner;

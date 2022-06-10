import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BusinessList from "../BusinessList/index";

import "./SearchBusiness.css";

const SearchBusiness = () => {
  const { id } = useParams();
  const businesses = useSelector((state) => Object.values(state.businesses));

  const [resultsState, setResultsState] = useState([]);

  //   console.log(businesses, "businesses search");

  function returnArrayOfBusinesses(businessesObj) {
    const finalArray = [];
    for (let i = 0; i < businessesObj.length; i++) {
      const newString = `${businessesObj[
        i
      ].address.toLowerCase()}${businessesObj[
        i
      ].city.toLowerCase()}${businessesObj[
        i
      ].name.toLowerCase()}${businessesObj[i].zipcode.toLowerCase()}`;
      finalArray.push(newString);
    }
    return finalArray;
  }

  const arrayOfBusinessesSearch = returnArrayOfBusinesses(businesses);

  function findBusinesses(businessesArray) {
    const businessIndexes = [];
    for (let i = 0; i < businessesArray.length; i++) {
      const oneString = businessesArray[i];
      if (oneString.includes(id.toLowerCase())) {
        businessIndexes.push(i);
      }
    }
    return businessIndexes;
  }

  const businessIndexes = findBusinesses(arrayOfBusinessesSearch);

  function finalBusinessesArray(busIndex, businesses) {
    const finalArr = [];
    for (let i = 0; i < busIndex.length; i++) {
      const index = busIndex[i];
      finalArr.push(businesses[index]);
    }
    return finalArr;
  }

  const searchResults = finalBusinessesArray(businessIndexes, businesses);

  //   sort by highest rated businesses
  searchResults.sort(
    (a, b) => b.ratingSum / b.ratingLen - a.ratingSum / a.ratingLen
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log(searchResults.length, "sr .length");

  // if (!searchResults.length) setResultsState(searchResults);

  if (searchResults.length) {
    return (
      <div className="search-results-container">
        <div className="search-title-container">
          <h1 className="business-search-title">
            {searchResults.length} Search Results Found For:{" "}
            <span className="search-parameter">{`"${id}"`}</span>
          </h1>
        </div>
        <div className="business-roll">
          {searchResults.map((business) => (
            <BusinessList business={business} key={business.id} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="search-results-container">
      <div className="no-search-title-container">
        <h1 className="no-business-search-title">
          0 Search Results For:{" "}
          <span className="no-search-parameter">{`"${id}"`}</span>
        </h1>
      </div>
    </div>
  );
};

export default SearchBusiness;

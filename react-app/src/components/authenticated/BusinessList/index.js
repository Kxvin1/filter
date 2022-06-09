import { Link } from "react-router-dom";
import "./BusinessList.css";
import star from "../../../logo-images/svgexport-12.png";
import directionsSvg from "../../../logo-images/directions-svg.svg";
import phoneSvg from "../../../logo-images/phone-svg.svg";

const BusinessList = ({ business }) => {
  const formatPhone = (number) => {
    return number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  };

  let phone = "";

  if (business?.phone_number) {
    phone = formatPhone(business.phone_number);
  }

  const avgRating = (business) => {
    let ratingS = business.ratingSum;

    let ratingL = business.ratingLen;

    const ratingAvg = ratingS / ratingL;

    let totalAvg = ratingAvg;

    if (!totalAvg) {
      return 0;
    }

    // this is temporary, will make the review seeds have a higher chance of leaving a review of 4 or higher
    // if (totalAvg >= 5) {
    //   totalAvg = Math.random() * (4.9 - 4.4) + 4.4;
    // }

    return totalAvg.toFixed(1).toString();
  };

  const busRating = avgRating(business);

  return (
    <div className="list-container">
      <div
        className="list-pic"
        style={{ backgroundImage: `url(${business.images_business[0]})` }}
      ></div>
      <div className="list-data">
        <Link className="list-title" to={`/businesses/${business?.id}`}>
          {business?.name}
          <span className="info_window_star">
            <img
              src={star}
              style={{
                width: "0.8em",
              }}
              alt="star-icon"
            ></img>
            <span className="number-star-rating">{busRating}</span>
          </span>
        </Link>
        {/* <p className="list-info">Phone Number: </p> {phone} */}
        <span className="info_window_phone">
          <img
            src={phoneSvg}
            style={{
              width: "1.4em",
              marginLeft: "1.1em",
              marginRight: "1.1em",
            }}
            className="phone-svg"
            alt="star-icon"
          ></img>
          <span className="number-phone-svg">{phone}</span>
        </span>
        {/* <p className="list-info">Business Address: </p> {business?.address} */}
        <span className="info_window_phone">
          <img
            src={directionsSvg}
            style={{
              width: "1.4em",
              marginLeft: "1.1em",
              marginRight: "1.1em",
            }}
            className="directions-svg"
            alt="star-icon"
          ></img>
          <span className="number-directions-svg">{business?.address}</span>
        </span>
        <div className="rating-container">
          <div className="list-more">
            <Link className="list-more-link" to={`/businesses/${business?.id}`}>
              Business Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessList;

import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { getBusinessesThunk } from "../../../store/business";

import "./ImageGallery.css";

const ImageGallery = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state?.session?.user);
  const businesses = useSelector((state) => Object.values(state?.businesses));
  const business = businesses.find((business) => business.id === +id);

  //   console.log(id, "id");

  useEffect(() => {
    dispatch(getBusinessesThunk());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDelete = async (photoId) => {
    await fetch(`/api/images/delete/${photoId}`, {
      method: "DELETE",
    });

    alert("Image deleted!");
    history.push(`/businesses/${id}`);
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  if (!business) {
    return <h1 className="roll-heading">Loading...</h1>;
  }

  return (
    <>
      <div className="title-container">
        <h1 className="image-stream-title">
          Photos for <span>&nbsp;</span>
          <span className="image-subtitle">
            <Link className="back-to-business-page" to={`/businesses/${id}`}>
              {business?.name}
            </Link>
          </span>
        </h1>
      </div>
      <div className="outside-grid">
        {business?.images_business?.map((image, idx) => (
          <figure key={idx}>
            {/* {console.log(business?.images_business, "business.images_business")} */}
            <img
              className="image-spread"
              alt={`filter-${image.id}`}
              src={image.url}
              onClick={() => {
                openInNewTab(image.url);
              }}
            />
            {user?.id === business?.user_id ? (
              <button className="trash" onClick={() => handleDelete(image.id)}>
                <i class="fa fa-trash"></i>
              </button>
            ) : (
              <></>
            )}
          </figure>
        ))}
      </div>
    </>
  );
};

export default ImageGallery;

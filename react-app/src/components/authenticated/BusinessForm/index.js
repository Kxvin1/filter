import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ImageUploading from "react-images-uploading";
import {
  addBusinessThunk,
  uploadFile,
  getBusinessesThunk,
} from "../../../store/business";

import Map from "./Map";
import "./BusinessForm.css";

const NewBusinessForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [phone_number, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const [validationErrors, setValidationErrors] = useState([]);
  const [images, setImages] = useState("");

  const user = useSelector((state) => state?.session?.user);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // need this to be able to quick search from this component
  useEffect(() => {
    dispatch(getBusinessesThunk());
  }, [dispatch]);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (validationErrors.length > 0) {
      return;
    }

    if (images.length < 3) {
      return;
    }

    const cleanImages = images.map((image) => image.file);

    const businessData = await dispatch(
      addBusinessThunk(
        user.id,
        name,
        address,
        zipcode,
        city,
        state,
        country,
        phone_number,
        website,
        coordinates.lat,
        coordinates.lng
      )
    );

    const businessId = businessData[1]?.id;
    const userId = businessData[1]?.user_id;

    await addImages(cleanImages, businessId, userId);
    window.alert("Business Added. Redirecting to your page."); // temp alert replace with toastify
    history.push(`/businesses/${businessId}`);
  };

  useEffect(() => {
    const errors = [];

    if (name.length > 40)
      errors.push("Business name too long (40 characters or less)");

    if (address.length === 0) errors.push("Address can't be empty");

    if (city.length > 25)
      errors.push("City name too long (25 characters or less)");

    if (zipcode.length !== 5) errors.push("Zipcode must be 5 digits");

    if (phone_number.length !== 10)
      errors.push("Phone number must be 10 digits");

    if (!website.includes("http://") && !website.includes("https://"))
      errors.push("Website must include http:// or https://");

    if (images.length < 3) errors.push("Minimum 3 images required");

    setValidationErrors(errors);
  }, [images, name, address, city, zipcode, phone_number, website]);

  const addImages = async (images, business_id, user_id) => {
    for (let x = 0; x < images.length; x++) {
      const obj = {
        file: images[x],
        business_id: business_id,
        user_id: user_id,
        newFile: true,
      };

      await dispatch(uploadFile(obj));
    }
  };
  return (
    <div className="new-business-form-container">
      <form onSubmit={handleUpload}>
        <div className="h1-and-p-container">
          <h1 className="new-business-h1">
            Hello! Let's start with your business details
          </h1>
          <p className="new-business-p">
            We'll use this information to help you create your business page on
            Filter.
          </p>
        </div>
        <div>
          <label className="new-business-label">
            {" "}
            Business Name
            <input
              className="new-business-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Business Name"
            />
          </label>
        </div>
        <div className="spot_address_input spot_input">
          <label className="new-business-label">
            Address
            <Map
              setCoordinates={setCoordinates}
              setAddress={setAddress}
              coordinates={coordinates}
              address={address}
            />
          </label>
        </div>
        <div>
          <label className="new-business-label">
            {" "}
            City
            <input
              className="new-business-input"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              placeholder="City"
            />
          </label>
        </div>
        <div className="spot_state_input spot_input">
          <label className="new-business-label">
            State:
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="new-business-select"
            >
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          </label>
        </div>
        <div>
          <label className="new-business-label">
            {" "}
            Zipcode
            <input
              className="new-business-input"
              type="text"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              required
              placeholder="Five numbers. Ex: 31294"
            />
          </label>
        </div>
        <div>
          <label className="new-business-label">
            {" "}
            Phone Number
            <input
              className="new-business-input"
              type="text"
              value={phone_number}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="Only numbers. Ex: 1234567890"
            />
          </label>
        </div>
        <div>
          <label className="new-business-label">
            {" "}
            Website URL
            <input
              className="new-business-input"
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              required
              placeholder="Include http:// or https://"
            />
          </label>
        </div>
        <div className="add-business-button-container">
          <button className="add-business-button" type="submit">
            Add Business
          </button>
        </div>
      </form>
      <div className="image-upload-container">
        <div className="image-upload-container-inner">
          <div className="field_section_container">
            <h3 className="images-header">Upload Images</h3>
            <div className="error_container_div">
              <ul className="error_container">
                {validationErrors.length > 0 &&
                  validationErrors.map((error) => (
                    <li
                      className="error_li"
                      key={error}
                      style={{ color: "red" }}
                    >
                      {error}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="imageUploadContainer">
              <ImageUploading
                multiple
                value={images}
                onChange={(imageList) => setImages(imageList)}
                maxNumber={20}
                dataURLKey="data_url"
                acceptType={["jpg", "png", "jpeg"]}
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  <div className="upload__image-wrapper">
                    <div
                      style={
                        isDragging ? { color: "rgb(192, 53, 22)" } : undefined
                      }
                      onClick={onImageUpload}
                      {...dragProps}
                      className="add_images_container"
                    >
                      <i className="fas fa-upload"></i>
                      Select Files or Drag
                    </div>
                    <div className="images_container">
                      {imageList.map((image, index) => (
                        <div key={index}>
                          <img src={image["data_url"]} alt="" height="230" />
                          <div className="editPhotoButtons">
                            <div
                              className="change_image"
                              onClick={() => onImageUpdate(index)}
                            >
                              Update
                            </div>
                            <div
                              className="remove_image"
                              onClick={() => onImageRemove(index)}
                            >
                              Delete
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </ImageUploading>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBusinessForm;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ImageUploading from "react-images-uploading";
import {
  editBusinessThunk,
  uploadFile,
  getUserBusinesses,
} from "../../../store/business";

import Map from "../BusinessForm/Map";

const EditBusinessForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { businessId } = useParams();

  const businesses = useSelector((state) => Object.values(state?.businesses));

  const businessToEdit = useSelector((state) => state?.businesses[businessId]);

  const [name, setName] = useState(businessToEdit?.name);
  const [address, setAddress] = useState(businessToEdit?.address);
  const [zipcode, setZipcode] = useState(businessToEdit?.zipcode);
  const [city, setCity] = useState(businessToEdit?.city);
  const [state, setState] = useState(businessToEdit?.state);
  const [country, setCountry] = useState(businessToEdit?.country);
  const [phone_number, setPhone] = useState(businessToEdit?.phone_number);
  const [website, setWebsite] = useState(businessToEdit?.website);
  const [coordinates, setCoordinates] = useState({
    lat: businessToEdit?.lat,
    lng: businessToEdit?.lng,
  });

  const [validationErrors, setValidationErrors] = useState([]);
  const [images, setImages] = useState(0);

  const user = useSelector((state) => state?.session?.user);

  useEffect(() => {
    let images = businessToEdit?.images_business.map((image) => {
      return { data_url: image.url };
    });

    setImages(images);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (validationErrors.length > 0) {
      return;
    }

    if (images.length < 3) {
      return;
    }

    const data = {
      user_id: user.id,
      name,
      address,
      zipcode,
      city,
      state,
      country,
      phone_number,
      website,
      lat: coordinates.lat,
      lng: coordinates.lng,
    };

    const businessData = await dispatch(
      editBusinessThunk(data, businessToEdit.id)
    );

    const businessId = businessData[1]?.id;
    const userId = businessData[1]?.user_id;

    await addImages(images, businessId, userId);
    window.alert("Edit Successful. Redirecting to your updated page."); // temp alert replace with toastify
    history.push(`/businesses/${businessId}`);
  };

  const addImages = async (images, business_id, user_id) => {
    for (let x = 0; x < images.length; x++) {
      let image = images[x];

      let newFile = false;
      let file;

      if (image.file) {
        // if there is a file, this is a new/updated upload
        newFile = true;
        file = image.file;
      } else {
        file = image.data_url;
      }

      const obj = {
        file: file,
        business_id: business_id,
        user_id: user_id,
        newFile: newFile,
      };

      await dispatch(uploadFile(obj));
    }
  };

  useEffect(() => {
    dispatch(getUserBusinesses(user.id));
  }, [dispatch, businessId]);

  // useEffect(() => {
  //   const errors = [];
  //   if (images.length < 3) errors.push("Please include at least 3 images");
  //   setValidationErrors(errors);
  // }, [name, zipcode, address, city, state, country, images]);

  useEffect(() => {
    const errors = [];

    if (images.length < 3) errors.push("Minimum 3 images required");

    if (name.length > 40)
      errors.push("Business name too long (40 characters or less)");

    if (city.length > 25)
      errors.push("City name too long (25 characters or less)");

    // short circuit so error doesn't show right away when empty
    if (zipcode.length > 5 && zipcode.length !== 5)
      errors.push("Zipcode must be 5 digits");

    // short circuit so error doesn't show right away when empty
    if (phone_number.length > 5 && phone_number.length !== 10)
      errors.push("Phone number must be 10 digits");

    // short circuit so error doesn't show right away when empty
    if (
      website.length > 0 &&
      !website.includes("http://") &&
      !website.includes("https://")
    )
      errors.push("Website invalid (must include http:// or https://)");

    setValidationErrors(errors);
  }, [images, name, city, zipcode, phone_number, website]);

  if (!businessToEdit) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="new-business-form-container">
      <form onSubmit={handleUpload}>
        <div className="h1-and-p-container">
          <h1 className="new-business-h1">
            Edit Details For: {businessToEdit?.name}
          </h1>
          <p className="new-business-p">
            We'll update your business page using this information and reflect
            those changes on your business page on Filter.
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
            Finish Editing {businessToEdit?.name}
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

export default EditBusinessForm;

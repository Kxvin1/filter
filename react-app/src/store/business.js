const LOAD = "business/LOAD";
const ADD_ONE = "business/ADD";
const EDIT = "business/EDIT";
const DELETE = "business/DELETE";
const LOAD_USER_BUSINESSES = "businesses/LOAD_USER_BUSINESSES";

const loadUserBusinesses = (businesses) => ({
  type: LOAD,
  businesses: businesses.businesses,
});

export const getUserBusinesses = (userId) => async (dispatch) => {
  const response = await fetch(`/api/businesses/user/${userId}`);
  if (response.ok) {
    const businesses = await response.json();
    dispatch(loadUserBusinesses(businesses));
  }
};

const loadBusiness = (businesses) => ({
  type: LOAD,
  businesses: businesses,
});

const addBusiness = (business) => ({
  type: ADD_ONE,
  business: business,
});

const editBusiness = (business) => ({
  type: EDIT,
  business: business,
});

const deleteBusiness = (business) => ({
  type: DELETE,
  business: business,
});

export const getBusinessesThunk = () => async (dispatch) => {
  const response = await fetch("/api/businesses");

  if (response.ok) {
    const businesses = await response.json();
    dispatch(loadBusiness(businesses.businesses));
  }
};

export const addBusinessThunk =
  (
    user_id,
    name,
    address,
    zipcode,
    city,
    state,
    country,
    phone_number,
    website,
    lat,
    lng
  ) =>
  async (dispatch) => {
    const response = await fetch("/api/businesses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        name,
        address,
        zipcode,
        city,
        state,
        country: "USA",
        phone_number,
        website,
        lat,
        lng,
      }),
    });

    if (response.ok) {
      const business = await response.json();
      dispatch(addBusiness(business));
      return ["Created", business];
    }
  };

export const editBusinessThunk = (data, businessId) => async (dispatch) => {
  const response = await fetch(`/api/businesses/${businessId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    const editedBusiness = await response.json();
    dispatch(editBusiness(editedBusiness));
    return ["Created", editedBusiness];
  }
};

export const deleteBusinessThunk = (businessId) => async (dispatch) => {
  const response = await fetch(`/api/businesses/${businessId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteBusiness(data));
  }
};

// for aws s3 --> image_routes.py
export const uploadFile = (fileForm) => async (dispatch) => {
  const { business_id, user_id, file, newFile } = fileForm;

  const form = new FormData();
  form.append("file", file);
  form.append("business_id", business_id);
  form.append("user_id", user_id);
  form.append("newFile", newFile);

  const res = await fetch("/api/images/upload", {
    method: "POST",
    body: form,
  });
};

const initialState = {};

const businessReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER_BUSINESSES:
      const userBusinesses = {};
      action.businesses.forEach((business) => {
        userBusinesses[business.id] = business;
      });
      return {
        ...userBusinesses,
      };
    case LOAD:
      const allBusinesses = {};
      action.businesses.forEach((business) => {
        allBusinesses[business.id] = business;
      });
      return {
        ...state,
        ...allBusinesses,
      };
    case ADD_ONE:
      const newState = {
        ...state,
        [action.business.id]: action.business,
      };
      return newState;
    case EDIT:
      const editState = {
        ...state,
        [action.business.id]: action.business,
      };
      return editState;
    case DELETE: {
      const newState = {
        ...state,
      };
      delete newState[action.business.id];
      return newState;
    }
    default:
      return state;
  }
};

export default businessReducer;

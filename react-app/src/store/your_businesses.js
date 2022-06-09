// const LOAD = "your-businesses/LOAD";

// const load = (businesses) => ({
//   type: LOAD,
//   businesses: businesses.businesses,
// });

// // Thunk for getting all businesses for a session user.

// export const getUserBusinesses = (userId) => async (dispatch) => {
//   const response = await fetch(`/api/businesses/user/${userId}`);
//   if (response.ok) {
//     const businesses = await response.json();
//     dispatch(load(businesses));
//   }
// };

// const initialState = {};

// const yourBusinessesReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case LOAD:
//       const userBusinesses = {};
//       action.businesses.forEach((business) => {
//         userBusinesses[business.id] = business;
//       });
//       return {
//         ...userBusinesses,
//       };
//     default:
//       return state;
//   }
// };

// export default yourBusinessesReducer;

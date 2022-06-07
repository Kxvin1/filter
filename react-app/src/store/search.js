const LOAD_SEARCH_RESULTS = "search/LOAD_SEARCH_RESULTS";

const loadSearchResults = (businesses) => ({
  type: LOAD_SEARCH_RESULTS,
  businesses: businesses,
});

export const loadSearchResultsThunk = (city, state) => async (dispatch) => {
  const res = await fetch(`/api/search/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      city,
      state,
    }),
  });

  if (res.ok) {
    const searchResults = await res.json();

    dispatch(loadSearchResults(searchResults));
    return ["Results", searchResults];
  }
};

const initialState = {};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SEARCH_RESULTS:
      const allResults = {};

      for (let business of action.businesses.businesses) {
        allResults[business.id] = business;
      }
      return { ...allResults };
    default:
      return state;
  }
};

export default searchReducer;

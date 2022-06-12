import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import usePlacesAutocomplete from "use-places-autocomplete";

export default function Map(props) {
  const { clearSuggestions } = usePlacesAutocomplete();

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latlng = await getLatLng(results[0]);
    props.setAddress(value);
    props.setCoordinates(latlng);
    clearSuggestions();
  };
  return (
    <PlacesAutocomplete
      value={props.address}
      onChange={props.setAddress}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
        return (
          <div className="search-container">
            <input
              {...getInputProps({ placeholder: "Address" })}
              className="search-input"
              required
            />
            <div>
              {loading ? <div>...loading</div> : null}
              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#FF9900" : "#fff",
                };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, { style })}
                    onSelect={() => handleSelect(suggestion.description)}
                  >
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        );
      }}
    </PlacesAutocomplete>
  );
}

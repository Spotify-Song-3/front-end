import React, { useEffect } from "react";
import { connect } from "react-redux";
import { searchSongs } from "../utils/actions";

import Header from "./Header";

const SearchResults = props => {
  const { term } = props.match.params;
  console.log(props);
  useEffect(() => {
    props.searchSongs(term);
  }, [term]);

  return (
    <div>
      <Header />
      <h1>
        Search Results for <em>{term}</em>
      </h1>
      {props.searchResults.length === 0 ? (
        <p>Sorry, no results found.</p>
      ) : (
        <div>
          {props.searchResults.map(({ id, artist_name, track_name }) => (
            <p key={id}>
              {track_name} - {artist_name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    searchResults: state.searchResults,
    isLoading: state.isLoading,
    message: state.message
  };
};

export default connect(mapStateToProps, { searchSongs })(SearchResults);

import React, { useState } from "react";
import { withRouter } from "react-router-dom";

const Form = props => {
  const [inputValue, setInputValue] = useState("");
  const handleChange = e => {
    setInputValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.history.push(`/search/${inputValue}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="searchBar"
        placeholder="Song Surf Here..."
        name="search"
        type="text"
        id="search"
        value={inputValue}
        onChange={handleChange}
      />
    </form>
  );
};

export default withRouter(Form);

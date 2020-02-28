import React, { useState } from "react";

const Form = () => {
  const [inputValue, setInputValue] = useState("");
  const handleChange = e => {
    setInputValue(e.target.value);
  };
  return (
    <form>
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

export default Form;

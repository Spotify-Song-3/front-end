import React from "react";

const Player = ({ id }) => {
  return (
    <iframe
      src={`https://open.spotify.com/embed/track/${id}`}
      width="80"
      height="80"
      frameborder="0"
      allowtransparency="true"
      allow="encrypted-media"
      style={{ marginRight: 10 }}
    ></iframe>
  );
};

export default Player;

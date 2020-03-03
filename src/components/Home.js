import React from "react";

import Header from "./Header";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="home-container">
        <div className="search-template">
          <i class="fa fa-search"></i> <span> Find Music</span>
          <p>
            {" "}
            Just tell us how you are feeling and we got you! Finding music by
            mood has never beene asier. Either in a dance mood or getting over
            breakup, we have something to play for you.
          </p>
        </div>
        <div className="favorite-template">
          <i class="fas fa-heart"></i> <span> Save Your Favorites</span>
          <p>
            {" "}
            When you like a song, simply click the like button and we will save
            it to your favorite songs list You can come back and listen to your
            favorite songs whenenever you want!
          </p>
        </div>
      </div>
      <footer>
        <div className="footer-content">
          <p>Song Surfer Est 2020</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

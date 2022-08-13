import React, { useState } from "react";
import logo from "../../imgs/logo.png";
import agent from "../../agent";

const Banner = ({ onSearchTitle }) => {
  const [showSeach, setShowSeach] = useState(false);
  const handleChange = (ev) => {
    ev.preventDefault();
    const title = ev.target.value;
    if (!title || title.length < 3) {
      return;
    }
    onSearchTitle(
      title,
      (page) => agent.Items.byTag(title, page),
      agent.Items.byTitle(title)
    );
  };

  const toggleSearch = () => {
    setShowSeach(!showSeach);
  };

  return (
    <div className="banner text-white">
      <div className="container p-4 text-center">
        <img src={logo} alt="banner" />
        <div>
          <span id="get-part" onClick={toggleSearch}>
            A place to get
          </span>
          {showSeach && (
            <input
              type="text"
              id="search-box"
              placeholder="What is it today that you truely desire?"
              onChange={handleChange}
            />
          )}
          <span> the cool stuff.</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;

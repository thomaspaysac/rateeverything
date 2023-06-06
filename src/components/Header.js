import React from "react";
import { Link } from "react-router-dom";
import "../App.css"

const Header = () => {
  return (
    <header>
      <div>
        <Link to="/">RateEverything</Link>
      </div>

      <div className="header_shortcuts">
        <div className="header_divider"></div>
        <Link>new music</Link>
        <Link>genres</Link>
        <Link>charts</Link>
        <Link>lists</Link>
        <Link>community</Link>
        <div className="header_divider"></div>
      </div>

      <div className="header_searchbar">
        Searchbar
      </div>

      <div className="header_user-container">
        Sign in
      </div>
    </header>
  )
}

export default Header;
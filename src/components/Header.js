import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import SearchEngine from "./SearchEngine";
import "../App.css"

const Header = (props) => {

  const UserContainer = () => {
    if (props.userStatus === false) {
      return (
        <Link to="/signin">sign in</Link>
      )
    } else {
      return (
        <div>
          <Link to="/profile">
            {props.user}
          </Link>
          <div onClick={() => signOut(getAuth())}>
            Sign out
          </div>
        </div>
      )
    }
  }

  

  return (
    <header id="main-header">
      <div className="header_title">
        <Link><div className="header_logo"></div> RYS</Link>
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

      <SearchEngine />

      <div className="header_user-container">
        <UserContainer/>
      </div>
    </header>
  )
}

export default Header;
import {React, useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import SearchEngine from "./SearchEngine";
import UserContainer from "./header/UserContainer";
import { getUserInfo } from "../functions";

const Header = (props) => {
  return (
    <header id="main-header">
      <div className="header_title">
        <Link to="/"><div className="header_logo"></div> EYS</Link>
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

      <div>
        <UserContainer
          user={props.user}
          userStatus={props.userStatus}
        />
      </div>
    </header>
  )
}

export default Header;
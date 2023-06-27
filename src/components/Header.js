import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import SearchEngine from "./SearchEngine";

import mailIcon from '../img/mail-white.png';
import stickyNoteImage from '../img/sticky-note.png';
import menuIcon from '../img/menu.png';

const Header = (props) => {

  const UserContainer = () => {
    if (props.userStatus === false) {
      return (
        <Link to="/signin">sign in</Link>
      )
    } else {
      return (
        <div className="header_user-container">
          <Link className='bolded' to="/profile">
            {props.user}
          </Link>
          <img src={mailIcon} alt='messages' />
          <img src={stickyNoteImage} alt='note' />
          <img src={menuIcon} alt='menu' />
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
        <UserContainer/>
      </div>
    </header>
  )
}

export default Header;
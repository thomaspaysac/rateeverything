import React from "react";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

import mailIcon from '../../img/mail-white.png';
import stickyNoteImage from '../../img/sticky-note.png';
import menuIcon from '../../img/menu.png';

const UserContainer = (props) => {
  const backdrop = document.getElementById('backdrop');
  const menu = document.querySelector('.menu-opened');
  const menuButton = document.getElementById('hamburger-menu');

  const displayMenu = () => {
    backdrop.style.display = 'block';
    menu.style.display = 'block';
    backdrop.addEventListener('click', () => {
      backdrop.style.display = 'none';
      menu.style.display = 'none';
    });
    menuButton.addEventListener('click', () => {
      backdrop.style.display = 'none';
      menu.style.display = 'none';
    })
  }


  if (props.userStatus === false) {
    return (
      <Link to="/signin">sign in</Link>
    )
  } else {
    return (
      <div className="header_user-container">
        <Link className='bolded header_user-info' to="/profile">
          <div className="header_avatar"></div>
          {props.user}
        </Link>
        <img src={mailIcon} alt='messages' />
        <img src={stickyNoteImage} alt='note' />
        <img src={menuIcon} alt='menu'
          id='hamburger-menu' 
          onClick={displayMenu} />
        <div className="menu-opened">
          <div>Profile</div>
          <div>Music collection</div>
          <div>Lists</div>
          <div>Messaging</div>
          <div>Settings</div>
          <div>Submissions</div>
          <div className="header_logout-button" onClick={() => signOut(getAuth())}>Log out</div>
        </div>
      </div>
    )
  }
}

export default UserContainer;
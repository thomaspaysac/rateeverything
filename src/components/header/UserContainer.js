import {React, useState} from "react";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

import mailIcon from '../../img/mail-white.png';
import stickyNoteImage from '../../img/sticky-note.png';
import menuIcon from '../../img/menu.png';

const UserContainer = (props) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const backdrop = document.getElementById('backdrop');
  const menu = document.querySelector('.menu-opened');
  const menuButton = document.getElementById('hamburger-menu');

  const logOutPrompt = () => {
    if(window.confirm('Are you sure you want to log out?')) {
      signOut(getAuth());
    }
  }

  const toggleMenu = () => {
    const backdropClick = () => {
      backdrop.style.display = 'none';
      menu.style.display = 'none';
      setMenuIsOpen(false);
    }
    const menuClick = () => {
      backdrop.style.display = 'none';
      menu.style.display = 'none';
      setMenuIsOpen(false);
    }
    if (!menuIsOpen) {
      backdrop.style.display = 'block';
      menu.style.display = 'block';
      menu.addEventListener('click', menuClick);
      backdrop.addEventListener('click', backdropClick);
      setMenuIsOpen(true);
    } else {
      backdrop.style.display = 'none';
      menu.style.display = 'none';
      backdrop.removeEventListener('click', backdropClick);
      setMenuIsOpen(false);
    }
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
          onClick={toggleMenu}
           />
        <div className="menu-opened">
          <Link to="/profile"><div>Profile</div></Link>
          <div>Music collection</div>
          <div>Lists</div>
          <div>Messaging</div>
          <div>Settings</div>
          <div>Submissions</div>
          <button className="header_logout-button" onClick={() => signOut(getAuth())}>Log out</button>
        </div>
      </div>
    )
  }
}

export default UserContainer;
import {React, useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

import mailIcon from '../../img/mail-white.png';
import stickyNoteImage from '../../img/sticky-note.png';
import menuIcon from '../../img/menu.png';
import { getUserInfo } from "../../functions";

const UserContainer = (props) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [userAvatar, setUserAvatar] = useState();

  const navigateTo = useNavigate();

  const logOutPrompt = () => {
    if(window.confirm('Are you sure you want to log out?')) {
      signOut(getAuth());
      navigateTo('/');
    }
  }

  const toggleMenu = () => {
    const backdrop = document.getElementById('backdrop');
    const menu = document.querySelector('.menu-opened');
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

  const fetchAvatar = async () => {
    const data = await getUserInfo(props.user);
    setUserAvatar(data.avatar.link);
  }

  useEffect(() => {
    if (props.user) {
      fetchAvatar();
    }
  }, [props.user, props.userStatus])

  const AvatarBox = () => {
    if (!userAvatar) {
      return null;
    } else {
      return (
        <img src={userAvatar} alt='user avatar'/>
      )
    }
  }


  if (!props.userStatus) {
    return (
      <Link to="/account/signin">sign in</Link>
    )
  } else {
    return (
      <div className="header_user-container">
        <Link className='bolded header_user-info' to={`/profile/${props.user}`}>
          <div className="header_avatar"><AvatarBox /></div>
          {props.user}
        </Link>
        <img src={mailIcon} alt='messages' />
        <img src={stickyNoteImage} alt='note' />
        <img src={menuIcon} alt='menu'
          id='hamburger-menu' 
          onClick={toggleMenu}
           />
        <div className="menu-opened">
          <Link to={`/profile/${props.user}`}><div>Profile</div></Link>
          <div>Music collection</div>
          <div>Lists</div>
          <div>Messaging</div>
          <div>Settings</div>
          <div>Submissions</div>
          <button className="header_logout-button" onClick={() => logOutPrompt()}>Log out</button>
        </div>
      </div>
    )
  }
}

export default UserContainer;
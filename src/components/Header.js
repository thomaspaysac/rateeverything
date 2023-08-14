import {React} from "react";
import { Link } from "react-router-dom";
import SearchEngine from "./SearchEngine";
import UserContainer from "./header/UserContainer";

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
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className='footer-inner'>
        <div className='footer-section'>
        <div className='footer-title bolded'>EVALUATE YOUR SOUNDS</div>
          <div>&copy; 2023</div>
          <div>This website is meant to be a copy of <a href='https://rateyourmusic.com/'>RateYourMusic</a>. More info in the <Link to='/about'>FAQ</Link>.</div>
        </div>
        <div className='footer-section'>
          <div className='footer-title'>EYS NETWORK</div>
          <Link to="/">EYS</Link>
        </div>
        <div className='footer-section'>
          <div className='footer-title'>INFO</div>
          <Link to='/about'>FAQ</Link>
          <Link>Development status</Link>
        </div>
        <div className='footer-section'>
        <div className='footer-title'>POLICY</div>
          <Link>Database standards</Link>
          <Link>Privacy</Link>
          <Link>Terms of service</Link>
        </div>
        <div className='footer-section'>
        <div className='footer-title'>CONTACT US</div>
          <Link>Support / Feedback</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

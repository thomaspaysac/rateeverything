import {React, useEffect} from 'react';


const About = () => {
  useEffect(() => {
    document.title = 'FAQ - Evaluate Your Sounds'
  }, [])

  return (
      <div className='content-page about-page'>
      <div className='content-wrapper'>
        <h2>About</h2>
        <h3>What is this website?</h3>
        <div>This website is meant to be a non-profit, close copy of <a href='https://rateyourmusic.com/'>Rate Your Music/Sonemic</a> as a portfolio piece for web development. Some features are not implemented.
        <br/>Built with <span className='bolded'>React, SCSS and Firebase</span>.</div>
        <div>I do not claim any rights to the visual design of this website.</div>
        <div>For more information, contact me on <a href="https://www.linkedin.com/in/thomas-paysac-5a2713254">LinkedIn</a> and on <a href="https://github.com/stagnant-sys">GitHub</a>.</div>
        <h3>Current features:</h3>
        <h4>Without creating a user account:</h4>
        <ul>
          <li>View any artists, releases and users pages</li>
        </ul>
        <h4>As a connected and verified user:</h4>
        <ul>
          <li>Add new artists and releases to the database</li>
          <li>Edit entries for artists and releases</li>
          <li>Rate and add releases to your catalog (owned or wishlist)</li>
          <li>Write releases reviews</li>
          <li>Follow other users to have their ratings highlighted on releases pages</li>
          <li>Send messages to other users by using the shoutbox on their profile page</li>
        </ul>
        
      </div>
      </div>
  );
}

export default About;

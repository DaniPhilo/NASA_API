import React, { useContext } from 'react'

import { UserContext } from '../context/user_context';

function Footer() {

  const { isAuthenticated } = useContext(UserContext);

  return (
    <footer>
      {isAuthenticated &&
        <>
          <div className="footer-div">
            <h4>Contact</h4>
            <p>nasa.api@nasa-api.com</p>
            <p>Work with us.</p>
          </div>

          <div className="footer-dividers"></div>

          <div className="footer-div">
            <h4>About</h4>
            <p>Lorem ipsum dolor sit amet.</p>
            <p>Lorem ipsum dolor sit.</p>
            <p>Lorem, ipsum dolor.</p>
          </div>

          <div className="footer-dividers"></div>

          <div className="footer-div">
            <h4>Documentation</h4>
            <a href='https://vast-castle-72865.herokuapp.com/api/docs' target="_blank">API documentation.</a>
          </div>
        </>}
    </footer>
  )
}

export default Footer
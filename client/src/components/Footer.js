import React, { useContext } from 'react'


import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/user_context';

function Footer() {

  const { isAuthenticated } = useContext(UserContext);

  const navigate = useNavigate();

  const redirectToDocs = () => {
    navigate('http://localhost:3001/api/docs');
  }

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
            <a href='http://localhost:3001/api/docs'>API documentation.</a>
          </div>
        </>}
    </footer>
  )
}

export default Footer
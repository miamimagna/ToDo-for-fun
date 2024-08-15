import React from 'react'
import { useState } from 'react';
const Header = () => {
  const [logged, setLogged] = useState(true)
  const [signup, setSignup] = useState(true)
  
  function handleLogout(){
    setLogged(false);
  }
  function toggleSignup(){
    setSignup(!signup);
  }

  return (
    <nav>
      <div className="logo"><p>Todo List MERN</p></div>
      <ul className="navigation">
        <li className="link">Dashboard</li>
        <li className="link">Profile</li>
      </ul>
      {logged?
        <div className='buttons'>
          <button 
            className='auth-button' 
            onClick={handleLogout}
          >
              Logout
          </button>
        </div>
        : (
            signup?
            <div className="buttons">
              <button className='auth-button' onClick={toggleSignup}>Login</button>
              <p>Signup</p>
            </div>
            : 
            <div className="buttons">
              <p>Login</p>
              <button className='auth-button' onClick={toggleSignup}>Signup</button>
            </div>
          )
      }
    </nav>
  )
}

export default Header

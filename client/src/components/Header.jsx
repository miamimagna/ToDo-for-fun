import React from 'react'
import { useNavigate } from 'react-router-dom';
const Header = ({logged, signup}) => {
  const navigate = useNavigate();
  function handleLogout(){
    navigate('/login')
  }
  function toggleSignup(){
    if(signup)
      navigate('/login');
    else navigate('/signup')
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

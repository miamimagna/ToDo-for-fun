import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import { useCookies } from 'react-cookie';

const Header = ({logged, signup}) => {
  // cookie
  const [cookie, setCookie, removeCookie] = useCookies('token');
  // authentication services
  const {dispatch} = useContext(AuthContext);
  const navigate = useNavigate();
  function handleLogout(){
    removeCookie('token');
    dispatch({
      type: 'logout'
    })
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
      {
        logged && 
        <ul className="navigation">
          <li className="link" onClick={() => navigate('/')}>Dashboard</li>
          <li className="link" onClick={() => navigate('/profile')}>Profile</li>
        </ul>
      }
      {logged?
        <div className='buttons'>
          <button className='auth-button logout' onClick={handleLogout}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 19C15 16.7909 12.3137 15 9 15C5.68629 15 3 16.7909 3 19M17 14L19 12M19 12L21 10M19 12L17 10M19 12L21 14M9 12C6.79086 12 5 10.2091 5 8C5 5.79086 6.79086 4 9 4C11.2091 4 13 5.79086 13 8C13 10.2091 11.2091 12 9 12Z" stroke="rgb(240, 240, 240)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
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

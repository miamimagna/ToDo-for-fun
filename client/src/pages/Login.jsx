import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Login = () => {
  const [formItem, setFormItem] = useState({
    username: '',
    password: ''
  });
  function handleChange(e){
    setFormItem({
        ...formItem,
        [e.target.name]: e.target.value,
    });
  }

  return (
    <div className='login-page'>
    <h1 className='auth-header'>Login</h1>
    <p className='auth-text'>Or <span className='auth-alternate'><Link className='auth-link' to='/signup'>Create an account.</Link></span></p>
    <form className='auth'>
        <input className='auth-entry'
               type="text" 
               name='username'
               value={formItem.username}
               placeholder='username'
               onChange={handleChange}
               required
        />
        <input type='password'
               name='password'
               className='auth-entry'
               value={formItem.password}
               placeholder='password'
               onChange={handleChange}
               minLength={6}
               required
        />
        <button className='auth-submit' type="submit">Login</button>
    </form>
    </div>
  );
};

export default Login

import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {useCookies} from 'react-cookie';

import AuthService from '../services/AuthServices';
import {AuthContext} from '../../contexts/AuthProvider';

const Login = () => {
  // cookie
  const [cookie, setCookie, removeCookie] = useCookies('token');
  // authentication context
  const {authState, dispatch} = useContext(AuthContext);
  // navigation
  const navigate = useNavigate();
  // form data handling
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm();
  // for invalid message
  const [invalidEntry, setInvalidEntry] = useState(false);
  
  // data submission
  const onSubmit = async({username, password})=> {
      try {
        const token = await AuthService.login({username, password});
        setInvalidEntry(false);
        console.log('successfully logged in');
        dispatch({
          type: 'login',
          username, token
        });
        setCookie('token', token);
        navigate('/');
      } catch (err) {
        console.log(err);
        setInvalidEntry(true);
      }
  }
  useEffect(() => {
    if(authState.username)
      navigate('/');
  }, [])

  return (
    <div className='login-page'>
    <h1 className='auth-header'>Login</h1>
    <p className='auth-text'>Or <span className='auth-alternate'><Link className='auth-link' to='/signup'>Create an account.</Link></span></p>
    <form className='auth' onSubmit={handleSubmit(onSubmit)}>
      {invalidEntry && <p className='error-message'>Invalid username or Password</p>}
      {errors.username && <p className='error-message'>username must be of 6 letter</p>}
      {errors.password && <p className="error-message">password must be of 6 letters</p>}
        <input type="text" 
               className="auth-entry" 
               placeholder='username'
               {...register('username', {
                required: true,
                minLength: {
                  value: 6,
                  message: 'Atleast 6 letters required for username'
                }
               })}
        />
        <input type="password" 
               className="auth-entry" 
               placeholder='password'
               {...register('password', {
                required: true,
                minLength: {
                  value: 6,
                  message: 'Atleast 6 letters required for password'
                }
               })}
        />
        <button className='auth-submit' type="submit">Login</button>
    </form>
    </div>
  );
};

export default Login

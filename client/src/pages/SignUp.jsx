import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {useCookies} from 'react-cookie';

import AuthService from '../services/AuthServices';
import {AuthContext} from '../../contexts/AuthProvider';

const SignUp = () => {
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
  // for conflict message
  const [conflict, setConflict] = useState(false)
  
  
  // data submission
  const onSubmit = async({username, name, password})=> {
      try {
        const token = await AuthService.signup({username, name, password});
        setInvalidEntry(false);
        setConflict(false);
        console.log('successfully logged in');
        dispatch({
          type: 'login',
          username, token
        });
        setCookie('token', token);
        navigate('/');
      } catch (err) {
        if(err.response.status === 409) setConflict(true);
        else setInvalidEntry(true);
      }
  }
  useEffect(() => {
    if(authState.username)
      navigate('/');
  }, [])

  return (
    <div className='login-page'>
    <h1 className='auth-header'>Sign Up</h1>
    <p className='auth-text'>Or <span className='auth-alternate'><Link className='auth-link' to='/login'>Login.</Link></span></p>
    <form className='auth2' onSubmit={handleSubmit(onSubmit)}>
      {invalidEntry && <p className='error-message'>Invalid username or Password</p>}
      {conflict && <p className='error-message'>username is already in use...</p>}
      {errors.username && <p className='error-message'>username must be of 6 letter</p>}
      {errors.name && <p className='error-message'>name must be of 6 letter</p>}
      {errors.password && <p className="error-message">password must be of 6 letters</p>}
        <input type="text" 
               className="auth-entry" 
               placeholder='username'
               {...register('username', {
                required: {
                  value: true,
                  message: 'field required'
                },
                minLength: {
                  value: 6,
                  message: '6-20 letters required for username'
                },
                maxLength: {
                  value: 20,
                  message: '6-20 letters required for username'
                },
               })}
        />
        <input type="text" 
               className="auth-entry" 
               placeholder='name'
               {...register('name', {
                required: {
                  value: true,
                  message: 'field required'
                },
                minLength: {
                  value: 6,
                  message: '6-20 letters required for name'
                },
                maxLength: {
                  value: 20,
                  message: '6-20 letters required for name'
                },
               })}
        />
        <input type="password" 
               className="auth-entry" 
               placeholder='password'
               {...register('password', {
                required: {
                  value: true,
                  message: 'field required'
                },
                minLength: {
                  value: 6,
                  message: '6-20 letters required for password'
                },
                maxLength: {
                  value: 20,
                  message: '6-20 letters required for password'
                },
               })}
        />
        <button className='auth-submit' type="submit">Login</button>
    </form>
    </div>
  );
};

export default SignUp

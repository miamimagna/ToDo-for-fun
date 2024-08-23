import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const ProfileForm = ({ name, onSubmit, invalidEntry }) => {
  const {
    register, 
    handleSubmit,
    formState: { errors }
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="profile-form">
      <h2>Change {name}</h2>
      {invalidEntry.status && <p className='error-message'>{invalidEntry.message}</p>}
      <input 
        key={'first'}
        type={name === 'Password' ? 'password' : 'text'}
        className="form-entry"
        placeholder={'New ' + name}
        {...register(name, {
          required: {
            value: true,
            message: 'field required'
          },
          minLength: {
            value: 6,
            message: `6-20 letters required for ${name}`
          },
          maxLength: {
            value: 20,
            message: `6-20 letters required for ${name}`
          },
        })} 
      />
      
      {errors[name] && <p className="error-message">{errors[name].message}</p>}
      
      <input 
        type="password"
        className="form-entry"
        placeholder={name === 'Password' ? "Old Password" : 'Password'}
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
      
      {errors.password && !errors[name] && <p className="error-message">{errors.password.message}</p>}
      
      <button className="form-submit" type="submit">Change {name}</button>
    </form>
  );
}

export default ProfileForm;

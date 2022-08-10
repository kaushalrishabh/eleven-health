import React from 'react'
import LoginDetails from './LoginDetails';
import LoginForm from './LoginForm';
import PicComponent from '../PicComponent';

const Login = () => {
  return (
    <div className='row p-2'>
      <div className='col-8'>
        <PicComponent />
      </div>
      <div className='col-4'>
        <LoginDetails />
        <LoginForm />
      </div>
    </div>
  );
}
export default Login;
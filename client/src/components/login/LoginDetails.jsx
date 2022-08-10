import React, { Fragment } from 'react';
import logo from '../../P-logo.png'

const LoginDetails = () => {
  return (
    <Fragment>
      <div className='App-header'>
        <img alt="Logo" src={logo} className="center App-logo"/>
      </div>
      <div className='App-header'>
        <h2><b>eleven</b> </h2>
      </div>
      <div className='App-header'>
        <h4> Are you a doctor?</h4>
      </div>
    </Fragment>
  )
}

export default LoginDetails;
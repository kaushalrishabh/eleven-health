import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
   
<footer className="text-center text-lg-start bg-white text-muted">
  <div className="text-center p-4 bg">
    © 2022 Copyright:
    <Link to="/" className="text-reset fw-bold" >Eleven Health</Link>
  </div>
</footer>

  )
}

export default Footer
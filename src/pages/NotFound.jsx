import React from 'react'

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="circle">
        <h1 className="error-code">404</h1>
        <p className="error-message">Oops! Page Not Found</p>
        <a href="/" className="home-btn">Go to Home</a>
      </div>
    </div>
  );
};

export default NotFound;
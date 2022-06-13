import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <main id="HomePage" className="container p-3">
      <h1 id="HomeHeader" className="text-center">
        Home
      </h1>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: '300px' }}
      >
        <Link to="/login" className="btn btn-primary btn-lg mx-1">
          Login
        </Link>
        <Link to="/register" className="btn btn-primary btn-lg mx-1">
          Register
        </Link>
      </div>
    </main>
  );
}

export default HomePage;

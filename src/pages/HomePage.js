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
        style={{ minHeight: '400px' }}
      >
        <Link to="/login" className="btn btn-primary">
          Login
        </Link>
      </div>
    </main>
  );
}

export default HomePage;

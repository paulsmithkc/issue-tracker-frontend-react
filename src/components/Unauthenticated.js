import React from 'react';
import { Link } from 'react-router-dom';

export function Unauthenticated() {
  return (
    <div className="card mb-3">
      <div className="card-body text-center">
        <div className="h4 text-danger">You are not logged in!</div>
        <Link className="btn btn-lg btn-primary" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
}

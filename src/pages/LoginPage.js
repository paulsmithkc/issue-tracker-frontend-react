import React from 'react';
// import { InputRow, SubmitRow } from '@merlin4/react-form-row';
import InputRow from '../components/InputRow';
import SubmitRow from '../components/SubmitRow';

function LoginPage() {

  function onSubmit() {
    alert('submit');
  }

  return (
    <main id="LoginPage" className="container p-3">
      <h1 className="text-center">Login Page</h1>
      <form id="LoginForm">
        <InputRow
          label="Email"
          id="LoginForm-EmailInput"
          name="email"
          type="email"
          autoComplete="email"
          validated={false}
        />
        <InputRow
          label="Password"
          id="LoginForm-PasswordInput"
          name="password"
          type="password"
          autoComplete="current-password"
          validated={false}
        />
        <SubmitRow onClick={onSubmit}>
          Login
        </SubmitRow>
      </form>
    </main>
  );
}

export default LoginPage;

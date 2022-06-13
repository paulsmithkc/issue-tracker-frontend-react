import React, { useState } from 'react';
import axios from 'axios';
// import { InputRow, SubmitRow } from '@merlin4/react-form-row';
import InputRow from '../components/InputRow';
import SubmitRow from '../components/SubmitRow';

function RegisterPage({ onLogin }) {
  const [submitted, setSubmitted] = useState(false);
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [email, setEmail] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const givenNameError = !givenName ? 'Given name required.' : '';
  const familyNameError = !familyName ? 'Given name required.' : '';

  const emailError = !email
    ? 'Email required.'
    : !email.includes('@')
    ? 'Email missing @ sign.'
    : '';
  const emailConfirmError =
    !emailConfirm || emailConfirm !== email ? 'Emails do not match' : '';

  const passwordError = !password
    ? 'Password required.'
    : password.length < 8
    ? 'Password must be at least 8 characters long.'
    : '';
  const passwordConfirmError =
    !passwordConfirm || passwordConfirm !== password
      ? 'Passwords do not match'
      : '';

  const anyErrors = emailError || passwordError;

  function onSubmit() {
    setSubmitted(true);

    if (anyErrors) {
      return Promise.reject({ message: 'Please fix errors above.' });
    }

    const promise = axios.post(
      `${process.env.REACT_APP_API_URL}/api/auth/register`,
      { givenName, familyName, email, password }
    );

    promise.then((res) => {
      onLogin(res.data);
    });

    return promise;
  }

  return (
    <main id="RegisterPage" className="container p-3">
      <div className="card">
        <div className="card-body">
          <h1 id="RegisterHeader" className="text-center">
            Register Account
          </h1>
          <form id="RegisterForm" onSubmit={(evt) => evt.preventDefault()}>
            <InputRow
              label="Given Name"
              id="RegisterForm-GivenNameInput"
              name="givenName"
              type="text"
              autoComplete="given-name"
              value={givenName}
              onChange={(evt) => setGivenName(evt.currentTarget.value)}
              validated={submitted || givenName}
              error={givenNameError}
            />
            <InputRow
              label="Family Name"
              id="RegisterForm-FamilyNameInput"
              name="familyName"
              type="text"
              autoComplete="family-name"
              value={familyName}
              onChange={(evt) => setFamilyName(evt.currentTarget.value)}
              validated={submitted || familyName}
              error={familyNameError}
            />
            <InputRow
              label="Email"
              id="RegisterForm-EmailInput"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(evt) => setEmail(evt.currentTarget.value)}
              validated={submitted || email}
              error={emailError}
            />
            <InputRow
              label="Confirm Email"
              id="RegisterForm-EmailConfirmInput"
              name="emailConfirm"
              type="email"
              autoComplete="email"
              value={emailConfirm}
              onChange={(evt) => setEmailConfirm(evt.currentTarget.value)}
              validated={submitted || email}
              error={emailConfirmError}
            />
            <InputRow
              label="Password"
              id="RegisterForm-PasswordInput"
              name="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(evt) => setPassword(evt.currentTarget.value)}
              validated={submitted || password}
              error={passwordError}
            />
            <InputRow
              label="Confirm Password"
              id="RegisterForm-PasswordConfirmInput"
              name="passwordConfirm"
              type="password"
              autoComplete="new-password"
              value={passwordConfirm}
              onChange={(evt) => setPasswordConfirm(evt.currentTarget.value)}
              validated={submitted || password}
              error={passwordConfirmError}
            />
            <SubmitRow onSubmit={onSubmit}>Login</SubmitRow>
          </form>
        </div>
      </div>
    </main>
  );
}

export default RegisterPage;
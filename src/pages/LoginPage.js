import React, { useState } from 'react';
// import { InputRow, SubmitRow } from '@merlin4/react-form-row';
import InputRow from '../components/InputRow';
import SubmitRow from '../components/SubmitRow';
import { login } from '../AppAPI';

function LoginPage({ onLogin }) {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailError = !email ? 'Email required.' : null;
  const passwordError = !password ? 'Password required.' : null;
  // const anyErrors = emailError || passwordError;

  function onSubmit() {
    setSubmitted(true);
    return login({ email, password }).then((res) => onLogin(res.data));
  }

  return (
    <main id="LoginPage" className="container p-3">
      <div className="card">
        <div className="card-body">
          <h1 id="LoginHeader" className="text-center">
            Login
          </h1>
          <form id="LoginForm" onSubmit={(evt) => evt.preventDefault()}>
            <div className="row">
              <div className="col-lg-6">
                <InputRow
                  label="Email"
                  id="LoginForm-EmailInput"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(evt) => setEmail(evt.currentTarget.value)}
                  validated={submitted}
                  error={emailError}
                />
              </div>
              <div className="col-lg-6">
                <InputRow
                  label="Password"
                  id="LoginForm-PasswordInput"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(evt) => setPassword(evt.currentTarget.value)}
                  validated={submitted}
                  error={passwordError}
                />
              </div>
            </div>
            <SubmitRow onSubmit={onSubmit}>Login</SubmitRow>
          </form>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;

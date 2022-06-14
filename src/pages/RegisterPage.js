import React, { useState } from 'react';
// import { InputRow, SubmitRow } from '@merlin4/react-form-row';
import InputRow from '../components/InputRow';
import SubmitRow from '../components/SubmitRow';
import { register } from '../AppAPI';

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
      ? 'Passwords do not match.'
      : '';

  const anyErrors =
    givenNameError ||
    familyNameError ||
    emailError ||
    emailConfirmError ||
    passwordError ||
    passwordConfirmError;

  function onSubmit() {
    setSubmitted(true);

    if (anyErrors) {
      return Promise.reject({ message: 'Please fix errors above.' });
    } else {
      return register({ givenName, familyName, email, password }).then((res) =>
        onLogin(res.data)
      );
    }
  }

  return (
    <main id="RegisterPage" className="container p-3">
      <div className="card">
        <div className="card-body">
          <h1 id="RegisterHeader" className="text-center">
            Register Account
          </h1>
          <form id="RegisterForm" onSubmit={(evt) => evt.preventDefault()}>
            <div className="row">
              <div className="col-lg-6">
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
              </div>
              <div className="col-lg-6">
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
              </div>
              <div className="col-lg-6">
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
              </div>
              <div className="col-lg-6">
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
              </div>
              <div className="col-lg-6">
                <InputRow
                  label="Password"
                  id="RegisterForm-PasswordInput"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(evt) => setPassword(evt.currentTarget.value)}
                  validated={submitted || password || passwordConfirm}
                  error={passwordError}
                />
              </div>
              <div className="col-lg-6">
                <InputRow
                  label="Confirm Password"
                  id="RegisterForm-PasswordConfirmInput"
                  name="passwordConfirm"
                  type="password"
                  autoComplete="new-password"
                  value={passwordConfirm}
                  onChange={(evt) =>
                    setPasswordConfirm(evt.currentTarget.value)
                  }
                  validated={submitted || password || passwordConfirm}
                  error={passwordConfirmError}
                />
              </div>
            </div>
            <SubmitRow onSubmit={onSubmit}>Register</SubmitRow>
          </form>
        </div>
      </div>
    </main>
  );
}

export default RegisterPage;

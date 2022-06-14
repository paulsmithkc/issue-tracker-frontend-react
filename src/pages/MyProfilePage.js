import React, { useEffect, useState, useContext } from 'react';
import moment from 'moment';
import InputRow from '../components/InputRow';
import SubmitRow from '../components/SubmitRow';
import { Unauthenticated } from '../components/Unauthenticated';
import { AuthContext } from '../AppContexts';
import { getMyProfile, updateMyProfile } from '../AppAPI';

function MyProfilePage() {
  const auth = useContext(AuthContext);
  const [profileState, setProfileState] = useState({});
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const givenNameError = !givenName ? 'Given name required.' : '';
  const familyNameError = !familyName ? 'Given name required.' : '';

  const passwordError =
    password && password.length < 8
      ? 'Password must be at least 8 characters long.'
      : '';
  const passwordConfirmError =
    passwordConfirm !== password ? 'Passwords do not match.' : '';

  const anyErrors =
    givenNameError || familyNameError || passwordError || passwordConfirmError;

  useEffect(() => {
    if (!auth) {
      setProfileState({});
    } else {
      setProfileState({ pending: 'Fetching profile...' });
      getMyProfile(auth)
        .then((res) => {
          console.log(`Profile loaded.`);
          setProfileState({ data: res.data });
          setGivenName(res.data.givenName);
          setFamilyName(res.data.familyName);
        })
        .catch((err) => {
          const errorMessage = err?.response?.data?.message || err.message;
          console.error(errorMessage);
          setProfileState({ error: errorMessage });
        });
    }
  }, [auth]);

  function onSubmit() {
    if (anyErrors) {
      return Promise.reject({ message: 'Please fix errors above.' });
    } else {
      return updateMyProfile(auth, {
        givenName,
        familyName,
        password: password || undefined,
      });
    }
  }

  return (
    <main id="MyProfilePage" className="container p-3">
      <h1 id="MyProfileHeader" className="text-center">
        My Profile
      </h1>
      {!auth && <Unauthenticated />}
      {auth && (
        <div className="card mb-3">
          <div className="card-body">
            {profileState.pending && (
              <div className="text-center">
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="false"
                ></span>
                <span>{profileState.pending}</span>
              </div>
            )}
            {profileState.error && (
              <div className="text-center text-danger">
                {profileState.error}
              </div>
            )}
            {profileState.data && (
              <form id="MyProfileForm" onSubmit={(evt) => evt.preventDefault()}>
                <h2 className="text-center">
                  {givenName} {familyName}
                </h2>
                <div className="row">
                  <div className="col-lg-6 text-center mb-1 fst-italic text-muted">
                    Registered:{' '}
                    {moment(profileState.data.registeredOn).format('LL')}
                  </div>
                  <div className="col-lg-6 text-center mb-1 fst-italic text-muted">
                    Last Login:{' '}
                    {moment(profileState.data.lastLoginOn).fromNow()}
                  </div>
                  <div className="col-lg-6">
                    <InputRow
                      label="Given Name"
                      id="MyProfileForm-GivenNameInput"
                      name="givenName"
                      type="text"
                      autoComplete="given-name"
                      value={givenName}
                      onChange={(evt) => setGivenName(evt.currentTarget.value)}
                      validated={true}
                      error={givenNameError}
                    />
                  </div>
                  <div className="col-lg-6">
                    <InputRow
                      label="Family Name"
                      id="MyProfileForm-FamilyNameInput"
                      name="familyName"
                      type="text"
                      autoComplete="family-name"
                      value={familyName}
                      onChange={(evt) => setFamilyName(evt.currentTarget.value)}
                      validated={true}
                      error={familyNameError}
                    />
                  </div>
                  <div className="col-lg-12">
                    <InputRow
                      label="Email"
                      id="MyProfileForm-EmailInput"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={profileState.data.email}
                      validated={false}
                      disabled
                    />
                  </div>
                  <div className="col-lg-6">
                    <InputRow
                      label="Change Password"
                      id="MyProfileForm-PasswordChangeInput"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(evt) => setPassword(evt.currentTarget.value)}
                      validated={password || passwordConfirm}
                      error={passwordError}
                    />
                  </div>
                  <div className="col-lg-6">
                    <InputRow
                      label="Confirm Change Password"
                      id="MyProfileForm-PasswordChangeConfirmInput"
                      name="passwordConfirm"
                      type="password"
                      autoComplete="new-password"
                      value={passwordConfirm}
                      onChange={(evt) =>
                        setPasswordConfirm(evt.currentTarget.value)
                      }
                      validated={password || passwordConfirm}
                      error={passwordConfirmError}
                    />
                  </div>
                </div>
                <SubmitRow onSubmit={onSubmit}>Update</SubmitRow>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

export default MyProfilePage;

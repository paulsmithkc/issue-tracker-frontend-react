import { useState, useEffect } from 'react';

export function useAuthStore() {
  const [auth, setAuthState] = useState(null);

  useEffect(() => {
    if (localStorage) {
      const authValue = localStorage.getItem('auth');
      if (authValue) {
        const authParsed = JSON.parse(authValue);
        setAuthState(authParsed);
      }
    }
  }, []);

  function setAuthStore(newAuth) {
    if (localStorage) {
      if (newAuth) {
        localStorage.setItem('auth', JSON.stringify(newAuth));
      } else {
        localStorage.setItem('auth', null);
      }
    }
    setAuthState(newAuth);
  }

  return [auth, setAuthStore];
}
import { useContext } from 'react';
import { AuthContext } from '../AppContexts';

export function useAuthContext() {
  return useContext(AuthContext);
}

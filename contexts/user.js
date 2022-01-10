import {
  createContext, useCallback, useEffect, useState,
} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { LOCAL_STORAGE, API } from '../utils/config';
import { get, post } from '../utils/AsyncApi';

export const UserContext = createContext(null);

const useProvideContext = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authEntity, setAuthEntity] = useLocalStorage(LOCAL_STORAGE.AUTH_ENTITY_KEY, null);

  const getAuthEntity = useCallback(async (email, password) => {
    const { error, result, status } = await post('/auth/token', {
      email,
      password,
      client_id: API.AUTH.CLIENT_ID,
      grant_type: 'password',
    });

    if (error) {
      setAuthEntity(null);

      if (status === 400) {
        return { success: false, error: 'Invalid credentials.' };
      }

      return { success: false, error: 'Server error, please try again.' };
    }

    setAuthEntity(result);
    return { success: true };
  }, [setAuthEntity]);

  const clearAuthEntity = useCallback(() => setAuthEntity(null), [setAuthEntity]);

  const refreshUserInfo = useCallback(async () => {
    const { error, result } = await get('/user/@me');

    if (error) {
      setAuthEntity(null);
      return;
    }

    setUser(result);
    setIsAuthenticated(true);
  }, [setAuthEntity]);

  useEffect(() => {
    if (authEntity && authEntity.accessToken) {
      refreshUserInfo();
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, [authEntity, refreshUserInfo]);

  return {
    ...user,
    getAuthEntity,
    clearAuthEntity,
    isAuthenticated,
  };
};

export default function UserProvider({ children }) {
  const context = useProvideContext();
  return <UserContext.Provider value={context}>{children}</UserContext.Provider>;
}

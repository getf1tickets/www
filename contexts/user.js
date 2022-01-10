import {
  createContext, useCallback, useEffect, useState,
} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { LOCAL_STORAGE } from '../utils/config';
import { get } from '../utils/AsyncApi';

export const UserContext = createContext(null);

const useProvideContext = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authEntity, setAuthEntity] = useLocalStorage(LOCAL_STORAGE.AUTH_ENTITY_KEY, null);

  const refreshUserInfo = useCallback(async () => {
    const { err, result } = await get('/user/@me');

    if (err) {
      setAuthEntity(null);
      return;
    }

    setUser(result);
    setIsAuthenticated(true);
  }, [setAuthEntity]);

  useEffect(() => {
    if (authEntity && authEntity.accessToken) {
      refreshUserInfo();
    }
  }, [authEntity, refreshUserInfo]);

  return {
    ...user,
    isAuthenticated,
  };
};

export default function UserProvider({ children }) {
  const context = useProvideContext();
  return <UserContext.Provider value={context}>{children}</UserContext.Provider>;
}

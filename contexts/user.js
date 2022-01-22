import {
  createContext, useCallback, useEffect, useState,
} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { LOCAL_STORAGE, API } from '../utils/config';
import { get, post, del } from '../utils/AsyncApi';
import useNotification from '../hooks/useNotification';

export const UserContext = createContext(null);

const useProvideContext = () => {
  const notification = useNotification();

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
    const { error, status, result } = await get('/user/@me');

    if (error) {
      notification.error('An error occurred while refreshing your data, please try again.');

      if (status !== -1 && status !== 500) {
        setAuthEntity(null);
      }

      return;
    }

    setUser(result);
    setIsAuthenticated(true);
  }, [setAuthEntity]); // do not include notification dependency here

  const addAddress = useCallback(async (address) => {
    const { error, result } = await post('/user/@me/address', address);

    if (error) {
      notification.error('An error occurred while adding your address, please try again');
      return;
    }

    setUser((oldValue) => {
      const newValue = { ...oldValue };
      newValue.addresses.push(result);
      return newValue;
    });
  }, [setUser, notification]);

  const deleteAddress = useCallback((addressId) => {
    const addressIndex = user.addresses?.findIndex((address) => address.id === addressId);
    if (addressIndex !== -1) {
      setUser((oldValue) => {
        const newValue = { ...oldValue };
        newValue.addresses.splice(addressIndex, 1);
        return newValue;
      });
      del(`/user/@me/address/${addressId}`)
        .then(({ error }) => {
          if (error) {
            notification.error('An error occurred while deleting your address, please try again');
          }
        });
    }
  }, [user, setUser, notification]);

  const setInfo = useCallback(async (data) => {
    const { error } = await post('/user/@me', {
      info: { ...data, email: undefined },
    });

    if (error) {
      notification.error('An error occurred while changing your settings');
      return;
    }

    setUser((oldUser) => {
      setUser({ ...oldUser, info: data });
    });
    notification.success('User settings changed');
  }, [setUser, notification]);

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
    isAuthenticated,
    getAuthEntity,
    clearAuthEntity,
    addAddress,
    deleteAddress,
    setInfo,
  };
};

export default function UserProvider({ children }) {
  const context = useProvideContext();
  return <UserContext.Provider value={context}>{children}</UserContext.Provider>;
}

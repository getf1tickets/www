/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  createContext, useCallback, useEffect, useState,
} from 'react';

export const UserContext = createContext(null);

const provideContext = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return {
    ...user,
    isAuthenticated,
  };
};

export default function UserProvider({ children }) {
  const context = provideContext();
  return <UserContext.Provider value={context}>{children}</UserContext.Provider>;
}

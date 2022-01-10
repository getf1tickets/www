import { useState, useCallback } from 'react';

export const retrieveItem = (key, json = true) => {
  const item = window.localStorage.getItem(key);
  return json && item ? JSON.parse(item) : item;
};

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      return retrieveItem(key) || initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (!value) window.localStorage.removeItem(key);
      else window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (ignored) {
      // ignore
    }
  }, [storedValue, setStoredValue, key]);

  return [storedValue, setValue];
}

export default useLocalStorage;

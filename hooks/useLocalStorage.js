import { useState, useCallback, useEffect } from 'react';

export const retrieveItem = (key, json = true) => {
  const item = window.localStorage.getItem(key);
  return json && item ? JSON.parse(item) : item;
};

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      return initialValue || null;
    } catch (error) {
      return null;
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

  useEffect(() => {
    try {
      const item = retrieveItem(key);
      if (item) {
        setValue(item);
      }
    } catch (ignored) {
      // keep
    }
  }, []);

  return [storedValue, setValue];
}

export default useLocalStorage;

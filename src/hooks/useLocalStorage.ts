import { useState } from 'react';

export default function useLocalStorage(key) {
  const defaultConfig = {
    time: 15
  }
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        return JSON.parse(item);
      } else {
        window.localStorage.setItem(key, JSON.stringify(defaultConfig));
        return defaultConfig;
      }
    } catch (error) {
      console.error('Error retrieving data from localStorage:', error);
      return defaultConfig;
    }
  });

  const updateFieldValue = (field, value) => {
    const data = { ...storedValue, [field]: value };
    setStoredValue(data);
    window.localStorage.setItem(key, JSON.stringify(data));
  };

  return [storedValue, updateFieldValue];
}

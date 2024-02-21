import { useState } from 'react';

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if(item){
        return JSON.parse(item)
      } else {
        window.localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue
      }
    } catch (error) {
      console.error('Error retrieving data from localStorage:', error);
      return initialValue;
    }
  });

  const updateFieldValue = (field, value) => {
    const data = {...storedValue, [field]: value}
    setStoredValue(data);
    window.localStorage.setItem(key, JSON.stringify(data));
  };

  return [storedValue, updateFieldValue];
}

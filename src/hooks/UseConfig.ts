import { useState } from 'react';

const UseConfig = (key: string) => {
  const defaultConfig = {
    time: 15
  };

  const [config, setConfig] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        return JSON.parse(item);
      } else {
        window.localStorage.setItem(key, JSON.stringify(defaultConfig));
        return defaultConfig;
      }
    } catch (error) {
      console.error('Error retrieving or parsing config:', error);
      return defaultConfig;
    }
  });

  const updateConfig = (field) => {
    const data = { ...config, ...field };
    setConfig(data);
    window.localStorage.setItem(key, JSON.stringify(data));
  };

  return [config, updateConfig];
};

export default UseConfig;

import { useState } from 'react';

interface ConfigField {
  [key: string]: number | string;
}
interface Config {
  [key: string]: number | string;
}

const UseConfig = (key: string) => {
  const defaultConfig = {
    time: 15,
    capitalizing: false
  };

  const [config, setConfig] = useState<Config>(() => {
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

  const updateConfig = (field: ConfigField) => {
    const data = { ...config, ...field };
    setConfig(data);
    window.localStorage.setItem(key, JSON.stringify(data));
  };

  return [config, updateConfig];
};

export default UseConfig;

import React from 'react';
import Home from './pages/Home';
import { ConfigContext } from './context/ConfigContext';
import UseConfig from './hooks/UseConfig';

const App: React.FC = () => {
  const [config, updateConfig] = UseConfig('config');
  return (
    <>
      <ConfigContext.Provider value={[config, updateConfig]}>
        <Home />
      </ConfigContext.Provider>
    </>
  );
};

export default App;

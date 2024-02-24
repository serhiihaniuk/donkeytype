import React, { useState } from 'react';
import Home from './pages/Home';
import { ConfigContext } from './context/ConfigContext';
import UseConfig from './hooks/UseConfig';
import { StatusContext } from './context/StatusContext';

const App: React.FC = () => {
  const [config, updateConfig] = UseConfig('config');
  const [status, setStatus] = useState('waiting');
  return (
    <>
      <StatusContext.Provider value={[status, setStatus]}>
        <ConfigContext.Provider value={[config, updateConfig]}>
          <Home />
        </ConfigContext.Provider>
      </StatusContext.Provider>
    </>
  );
};

export default App;

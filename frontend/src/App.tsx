/* eslint-disable @typescript-eslint/ban-ts-comment */
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
    {/* @ts-expect-error */}
      <ConfigContext.Provider value={[config, updateConfig]}>
        <StatusContext.Provider value={[status, setStatus]}>
          <Home />
        </StatusContext.Provider>
      </ConfigContext.Provider>
    </>
  );
};

export default App;

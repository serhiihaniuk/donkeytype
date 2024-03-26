/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react';
import { ConfigContext } from './context/ConfigContext';
import UseConfig from './hooks/UseConfig';
import { StatusContext } from './context/StatusContext';
import Layout from './pages/Layout';
import Home from './pages/Home';

const App: React.FC = () => {
  const [config, updateConfig] = UseConfig('config');
  const [status, setStatus] = useState('waiting');
  return (
    <>
    {/* @ts-expect-error */}
      <ConfigContext.Provider value={[config, updateConfig]}>
        <StatusContext.Provider value={[status, setStatus]}>
          <Layout>
            <Home/>
          </Layout>
        </StatusContext.Provider>
      </ConfigContext.Provider>
    </>
  );
};

export default App;

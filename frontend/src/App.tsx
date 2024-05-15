/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react';
import { ConfigContext } from './context/ConfigContext';
import UseConfig from './hooks/UseConfig';
import { StatusContext } from './context/StatusContext';
import Layout from './pages/Layout';
import Home from './pages/Home';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Login from './pages/Login';
import AuthProvider from './context/AuthContext';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  const [config, updateConfig] = UseConfig('config');
  const [status, setStatus] = useState('waiting');
  return (
    <div className='wrapper'>
    {/* @ts-expect-error */}
      <ConfigContext.Provider value={[config, updateConfig]}>
        <StatusContext.Provider value={[status, setStatus]}>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="login" element={<Login />} />
                  <Route path="dashboard" element={<Dashboard/>}/>
                </Route>
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </StatusContext.Provider>
      </ConfigContext.Provider>
    </div>
  );
};

export default App;

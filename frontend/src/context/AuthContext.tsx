import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import inMemoryJWT from '@/services/inMemoryJWTService';
import config from '../../../config'

export const AuthClient = axios.create({
  baseURL: `${config.API_URL}/auth`,
  withCredentials: true
})
export const ResourceClient = axios.create({
  baseURL: `${config.API_URL}/resource`,
  withCredentials: true
})

ResourceClient.interceptors.request.use(
  (config) => {
    const accessToken = inMemoryJWT.getToken();

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`
    }
    return config;
  },
  (error) => {
    Promise.reject(error)
  }
)

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [data, setData] = useState();
  const [isUserLogged, setIsUserLogged] = useState(false)
  const [isAppReady, setIsAppReady] = useState(false)
  const handleFetchProtected = () => {
    ResourceClient.get('/protected')
    .then((res)=> {
      setData(res.data)
    })
    .catch(e => {
      console.log(e)
    })
    }
  

  const handleLogOut = () => {
    AuthClient.post("/logout").then(()=>{
      inMemoryJWT.deleteToken()
      setIsUserLogged(false)
    })
    .catch(e => console.log(e))
  };

  const handleSignUp = (data) => {
    AuthClient
      .post('/sign-up', data)
      .then((res) => {
        const { accessToken, accessTokenExpiration } = res.data;
        setIsUserLogged(true)

        inMemoryJWT.setToken(accessToken, accessTokenExpiration);
      })
      .catch((error) => {
        
        console.error(error);
      });
  };

  const handleSignIn = (data) => {
    AuthClient
      .post('/sign-in', data)
      .then((res) => {
        const { accessToken, accessTokenExpiration } = res.data;
        setIsUserLogged(true)

        inMemoryJWT.setToken(accessToken, accessTokenExpiration);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(()=> {
    AuthClient.post("/refresh")
    .then((res) => {
      const { accessToken, accessTokenExpiration } = res.data;
      inMemoryJWT.setToken(accessToken, accessTokenExpiration)
      
      setIsAppReady(true)
      setIsUserLogged(true)
    })
      .catch(()=>{
        setIsAppReady(true)
        setIsUserLogged(false)
      })
  })

  return (
    <AuthContext.Provider
      value={{
        data,
        handleFetchProtected,
        handleSignUp,
        handleSignIn,
        handleLogOut,
        isUserLogged, 
        
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

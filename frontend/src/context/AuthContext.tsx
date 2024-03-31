import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import inMemoryJWT from '@/services/inMemoryJWTService';
import config from '../../../config'
import { UserSignInType, UserSignUpType } from '@/types/User';

export const AuthClient = axios.create({
  baseURL: `${config.API_URL}/auth`,
  withCredentials: true
})
export const ResourceClient = axios.create({
  baseURL: `${config.API_URL}/resource`,
  withCredentials: true
})

interface AuthContextType {
  handleSignUp: (data: UserSignUpType) => void;
  handleSignIn: (data: UserSignInType) => void;
  handleLogOut: () => void;
  isUserLogged: boolean;
  isAppReady: boolean;
}

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

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  // const [data, setData] = useState();
  const [isUserLogged, setIsUserLogged] = useState(false)
  const [isAppReady, setIsAppReady] = useState(false)
  // const handleFetchProtected = () => {
  //   ResourceClient.get('/protected')
  //   .then((res)=> {
  //     setData(res.data)
  //   })
  //   .catch(e => {
  //     console.log(e)
  //   })
  //   }
  

  const handleLogOut = () => {
    AuthClient.post("/logout").then(()=>{
      inMemoryJWT.deleteToken()
      setIsUserLogged(false)
    })
    .catch(e => console.log(e))
  };

  const handleSignUp = (data: UserSignUpType) => {
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

  const handleSignIn = (data: UserSignInType) => {
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
        handleSignUp,
        handleSignIn,
        handleLogOut,
        isUserLogged, 
        isAppReady
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

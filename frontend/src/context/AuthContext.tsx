import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import inMemoryJWT from '@/services/inMemoryJWTService';
import config from '../../../config';
import { UserSignInType, UserSignUpType } from '@/types/User';
import Circle from '@/components/Circle';

export const AuthClient = axios.create({
  baseURL: `${config.API_URL}/auth`,
  withCredentials: true,
});
export const ResourceClient = axios.create({
  baseURL: `${config.API_URL}/resource`,
  withCredentials: true,
});

interface AuthContextType {
  handleSignUp: (data: UserSignUpType) => Promise<{ success: boolean, message: string }>;
  handleSignIn: (data: UserSignInType) => Promise<{ success: boolean, message: string }>;
  handleLogOut: () => void;
  isUserLogged: boolean;
  isAppReady: boolean;
}


ResourceClient.interceptors.request.use(
  (config) => {
    const accessToken = inMemoryJWT.getToken();

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);
  // const [data, setData] = useState();
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
    AuthClient.post('/logout')
      .then(() => {
        localStorage.removeItem('username')
        inMemoryJWT.deleteToken();
        setIsUserLogged(false);
      })
      .catch((e) => console.log(e));
  };

  const handleSignUp = (data: UserSignUpType) => {
    return AuthClient.post('/sign-up', data)
      .then((res) => {
        const { accessToken, accessTokenExpiration } = res.data;
        setIsUserLogged(true);
        inMemoryJWT.setToken(accessToken, accessTokenExpiration);
        localStorage.setItem('username', data.username)
        return { success: true, message: '' };
      })
      .catch((error) => {
        if (error.response.status === 409) {
          return { success: false, message: 'Email is not avaliable' };
        } else return { success: false, message: error.message };
      });
  };

  const handleSignIn = (data: UserSignInType) => {
    return AuthClient.post('/sign-in', data)
      .then((res) => {
        const { username, accessToken, accessTokenExpiration } = res.data;
        setIsUserLogged(true);
        inMemoryJWT.setToken(accessToken, accessTokenExpiration);
        localStorage.setItem('username', username)
        return { success: true, message: ''}
      })
      .catch((error) => {
        if (error.response.status === 401) {
          return { success: false, message: 'Wrong email or password' };
        } else return { success: false, message: error.message };
      });
  };

  useEffect(() => {
    AuthClient.post('/refresh')
      .then((res) => {
        const { accessToken, accessTokenExpiration } = res.data;
        inMemoryJWT.setToken(accessToken, accessTokenExpiration);

        setIsAppReady(true);
        setIsUserLogged(true);
      })
      .catch(() => {
        setIsAppReady(true);
        setIsUserLogged(false);
      });
  });

  useEffect(() => {
    const handlePersistedLogOut = (event: StorageEvent) => {
      if (event.key === config.LOGOUT_STORAGE_KEY) {
        inMemoryJWT.deleteToken();
        setIsUserLogged(false);
      }
    };
    window.addEventListener('storage', handlePersistedLogOut);

    return () => {
      window.removeEventListener('storage', handlePersistedLogOut);
    };
  });

  return (
    <AuthContext.Provider
      value={{
        handleSignUp,
        handleSignIn,
        handleLogOut,
        isUserLogged,
        isAppReady,
      }}
    >
      {isAppReady ? children : <Circle/>}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

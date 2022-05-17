import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState} from 'react';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [authState, setAuthState] = useState({
    user: null,
    accessToken: null,
    authenticated: false,
  });

  const loadToken = async () => {
    const accessToken = await AsyncStorage.getItem('token');
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    setAuthState({
      user,
      accessToken,
      authenticated: accessToken != null,
    });
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };


  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState,
        loadToken,
        getAccessToken
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
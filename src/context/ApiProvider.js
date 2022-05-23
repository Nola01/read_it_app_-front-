import React, {createContext, useContext} from 'react';
import axios from 'axios';
import { AuthContext } from './AuthProvider';
import {BASE_URL} from '../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ApiContext = createContext();

const ApiProvider = ({children}) => {
  const authContext = useContext(AuthContext);

  const authRequest = axios.create({
    baseURL: BASE_URL,
  });

  const publicRequest = axios.create({
    baseURL: BASE_URL,
  });

  const getItineraries = async () => {
    const response = await authRequest.get('/itineraries');
    //console.log(response.data);
    return response.data;
  };

  const getBooks = async () => {
    const response = await authRequest.get('/books');
    //console.log(response.data);
    return response.data;
  };

  const login = async (email, password) => {
    const response = await publicRequest.post('/login', {
      email: email,
      password,
    });
    const {accessToken, user} = response.data;
    await AsyncStorage.setItem('token', accessToken);
    await AsyncStorage.setItem('user', JSON.stringify(user));
    authContext.setAuthState({
      user,
      accessToken,
      authenticated: true,
    });
  };

  const register = async (name, surname, email, password) => {
    const response = await publicRequest.post('/register', {
      name,
      surname,
      email,
      password,
      pin,
      role
    });
    // login(email, password);
    const {accessToken, user} = response.data;
    await AsyncStorage.setItem('token', accessToken);
    await AsyncStorage.setItem('user', JSON.stringify(user));
    authContext.setAuthState({
      user,
      accessToken,
      authenticated: true,
    });
  };

  authRequest.interceptors.request.use(
    config => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${authContext.getAccessToken()}`;
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  authRequest.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response.status !== 401) {
        return Promise.reject(error);
      }
      authContext.logout();
      return Promise.reject(error);
    },
  );

  return (
    <ApiContext.Provider
      value={{
        getItineraries,
        getBooks,
        login,
        register
      }}>
      {children}
    </ApiContext.Provider>
  );
};

export {ApiContext, ApiProvider};
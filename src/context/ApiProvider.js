import React, {createContext, useContext} from 'react';
import axios from 'axios';
import { AuthContext } from './AuthProvider';
import {BASE_URL} from '../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import bcrypt from 'bcrypt';

const ApiContext = createContext();

const ApiProvider = ({children}) => {
  const authContext = useContext(AuthContext);
  const {authState} = useContext(AuthContext);

  const authRequest = axios.create({
    baseURL: BASE_URL,
  });

  const publicRequest = axios.create({
    baseURL: BASE_URL,
  });

  const getUserGroups = async (id) => {
    const response = await authRequest.get(`/app/groups/${id}`);
    return response.data;
  }


  const getItineraries = async () => {
    const response = await authRequest.get('/app/itineraries');
    //console.log(response.data);
    return response.data;
  };

  const getItineraryById = async (id) => {
    const response = await authRequest.get(`/itineraries/${id}`);
    //console.log(response.data);
    return response.data;
  };

  const createItinerary = async (itinerary) => {
    let config = {
      headers: {
        'x-token': authState.accessToken,
      }
    }
    console.log(itinerary);
    const response = await authRequest.post(`/app/itineraries/new`, itinerary, config);
    return response.data;
  }

  const deleteItinerary = async (id) => {
    let config = {
      headers: {
        'x-token': authState.accessToken,
      }
    }
    console.log(id);
    const response = await authRequest.delete(`/app/itineraries/${id}`, config);
    return response.data;
  }

  const updateItinerary = async (itinerary, id) => {
    let config = {
      headers: {
        'x-token': authState.accessToken,
      }
    }
    console.log(itinerary);
    console.log(id);
    const response = await authRequest.put(`/app/itineraries/${id}`, itinerary, config);
    return response.data;
  }



  const getBooks = async () => {
    const response = await authRequest.get('/app/books');
    //console.log(response.data);
    return response.data;
  };

  const getBooksByUser = async (id) => {
    const response = await authRequest.get(`/app/users/books/${id}`);
    //console.log(response.data);
    return response.data;
  };

  const createBook = async (book) => {
    let config = {
      headers: {
        'x-token': authState.accessToken,
      }
    }
    console.log(book);

    const response = await authRequest.post('/app/books/new', book, config);
    return response.data;
  }

  const deleteBook = async (id) => {
    let config = {
      headers: {
        'x-token': authState.accessToken,
      }
    }
    console.log(authState.accessToken);
    console.log(id);

    const response = await authRequest.delete(`/app/books/${id}`, config);
    return response.data;
  }



  const getUsers = async () => {
    const response = await authRequest.get('/app/users');
    //console.log(response.data);
    return response.data;
  };


  

  const login = async (email, password) => {
    const response = await publicRequest.post('/app/auth/login', {
      email,
      password,
    });
    const accessToken = response.data.token;
    const user = response.data.user;
    await AsyncStorage.setItem('token', accessToken);
    await AsyncStorage.setItem('user', JSON.stringify(user));
    authContext.setAuthState({
      user,
      accessToken,
      authenticated: true,
    });
  };

  const register = async (name, email, password, pin, role) => {
    const response = await publicRequest.post('/app/auth/register', {
      name,
      email,
      password,
      pin,
      role
    });
    // login(email, password);
    if (response.data.ok === 'false') {
      throw new Error (response.data.msg)
    }

    const accessToken = response.data.token;
    const user = response.data.user;
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
        getUserGroups,
        getItineraries,
        getItineraryById,
        createItinerary,
        deleteItinerary,
        updateItinerary,
        getBooks,
        getBooksByUser,
        createBook,
        deleteBook,
        getUsers,
        login,
        register
      }}>
      {children}
    </ApiContext.Provider>
  );
};

export {ApiContext, ApiProvider};
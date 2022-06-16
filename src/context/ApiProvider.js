import React, {createContext, useContext} from 'react';
import axios from 'axios';
import { AuthContext } from './AuthProvider';
import {BASE_URL} from '../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';
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
    try {
      const response = await authRequest.get(`/app/groups/${id}`);
      return response.data;
    } catch (error) {
      ToastAndroid.show('Error al obtener grupos', ToastAndroid.LONG)
    }
  }



  const getItineraries = async () => {
    try {
      const response = await authRequest.get('/app/itineraries');
      return response.data;
    } catch (error) {
      ToastAndroid.show('Error al obtener itinerarios', ToastAndroid.LONG)
    }
  };

  const getItineraryById = async (id) => {
    try {
      const response = await authRequest.get(`/itineraries/${id}`);
      return response.data;
    } catch (error) {
      ToastAndroid.show('Error al obtener itinerario', ToastAndroid.LONG)
    }
  };

  const createItinerary = async (itinerary) => {
    try {
      let config = {
        headers: {
          'x-token': authState.accessToken,
        }
      }
      console.log(itinerary);
      const response = await authRequest.post(`/app/itineraries/new`, itinerary, config);
      return response.data;
    } catch (error) {
      ToastAndroid.show('Error, compruebe los campos', ToastAndroid.LONG)
    }
  }

  const deleteItinerary = async (id) => {
    try {
      let config = {
        headers: {
          'x-token': authState.accessToken,
        }
      }
      console.log(id);
      const response = await authRequest.delete(`/app/itineraries/${id}`, config);
      return response.data;
    } catch (error) {
      ToastAndroid.show('Error al eliminar itinerario', ToastAndroid.LONG)
    }
  }

  const updateItinerary = async (itinerary, id) => {
    try {
      let config = {
        headers: {
          'x-token': authState.accessToken,
        }
      }
      console.log(itinerary);
      console.log(id);
      const response = await authRequest.put(`/app/itineraries/${id}`, itinerary, config);
      return response.data;
    } catch (error) {
      ToastAndroid.show('Error al actualizar itinerario', ToastAndroid.LONG)
    }
  }




  const getBooks = async () => {
    try {
      const response = await authRequest.get('/app/books');
      return response.data;
    } catch (error) {
      ToastAndroid.show('Error al obtener libros', ToastAndroid.LONG)
    }
  };

  const getBooksByUser = async (id) => {
    try {
      const response = await authRequest.get(`/app/users/books/${id}`);
      return response.data;
    } catch (error) {
      ToastAndroid.show('Error al obtener libros del usuario', ToastAndroid.LONG)
    }
  };

  const createBook = async (book) => {
    try {
      let config = {
        headers: {
          'x-token': authState.accessToken,
        }
      }
      console.log(book);
  
      const response = await authRequest.post('/app/books/new', book, config);
      return response.data;
    } catch (error) {
      ToastAndroid.show('Error al crear libro', ToastAndroid.LONG)
    }
  }

  const deleteBook = async (id) => {
    try {
      let config = {
        headers: {
          'x-token': authState.accessToken,
        }
      }
      console.log(authState.accessToken);
      console.log(id);
  
      const response = await authRequest.delete(`/app/books/${id}`, config);
      return response.data;
    } catch (error) {
      ToastAndroid.show('Error al eliminar libro', ToastAndroid.LONG)
    }
  }

  const updateBook = async (book, id) => {
    try {
      let config = {
        headers: {
          'x-token': authState.accessToken,
        }
      }
      console.log(book);
      console.log(id);
      const response = await authRequest.put(`/app/books/${id}`, book, config);
      return response.data;
    } catch (error) {
      ToastAndroid.show('Error al actualizar itinerario', ToastAndroid.LONG)
    }
  }



  const getUsers = async () => {
    try {
      const response = await authRequest.get('/app/users');
      return response.data;
    } catch (error) {
      ToastAndroid.show('Error al obtener usuarios', ToastAndroid.LONG)
    }
  };

  const getStudents = async () => {
    try {
      const response = await authRequest.get('/app/users/students');
      return response.data;
    } catch (error) {
      ToastAndroid.show('Error al obtener alumnos', ToastAndroid.LONG)
    }
  };


  

  const login = async (email, password) => {
    try {
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
    } catch (error) {
      ToastAndroid.show('Error al iniciar sesión', ToastAndroid.SHORT)
    }
  };

  const register = async (name, email, password, pin, role) => {
    try {
      const response = await publicRequest.post('/app/auth/register', {
        name,
        email,
        password,
        pin,
        role
      });
      // login(email, password);
      if (response.data.ok === false) {
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
    } catch (error) {
      ToastAndroid.show('Error al registrar', ToastAndroid.LONG)
    }
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
        updateBook,
        getUsers,
        getStudents,
        login,
        register
      }}>
      {children}
    </ApiContext.Provider>
  );
};

export {ApiContext, ApiProvider};
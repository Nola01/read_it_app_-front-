import React, {useContext, useEffect} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import ItinerariesScreen from '../screens/ItinerariesScreen';
import BooksScreen from '../screens/BooksScreen';
import ProfileScreen from '../screens/ProfileScreen';
import StudentsScreen from '../screens/StudentsScreen';
import LogoutScreen from '../screens/LogoutScreen';
import LoginScreen from '../screens/LoginScreen';

import { AuthContext } from '../context/AuthProvider';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const {authState, loadToken, logout} = useContext(AuthContext);

  useEffect(() => {
    const loadjwt = async () => {
      try {
        await loadToken();
      } catch (err) {
        await logout();
      }
    };
    loadjwt();
  }, []);

  if (!authState.authenticated) return <LoginScreen />;
  else
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Itinerarios" component={ItinerariesScreen} />
        <Drawer.Screen name="Libros" component={BooksScreen} />
        <Drawer.Screen name="Mi perfil" component={ProfileScreen} />
        <Drawer.Screen name="Alumnos" component={StudentsScreen} />
        <Drawer.Screen name="Cerrar sesión" component={LogoutScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default DrawerNavigator;
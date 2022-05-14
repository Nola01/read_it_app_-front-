import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import ItinerariosScreen from '../screens/itinerariesScreen';
import BooksScreen from '../screens/BooksScreen';
import ProfileScreen from '../screens/ProfileScreen';
import StudentsScreen from '../screens/StudentsScreen';
import LogoutScreen from '../screens/LogoutScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Itinerarios" component={ItinerariosScreen} />
        <Drawer.Screen name="Libros" component={BooksScreen} />
        <Drawer.Screen name="Mi perfil" component={ProfileScreen} />
        <Drawer.Screen name="Alumnos" component={StudentsScreen} />
        <Drawer.Screen name="Cerrar sesión" component={LogoutScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default DrawerNavigator;
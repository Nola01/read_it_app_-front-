import React, {useContext, useEffect, useState} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import ItinerariesScreen from '../screens/itinerariesScreen';
import BooksScreen from '../screens/BooksScreen';
import ProfileScreen from '../screens/ProfileScreen';
import StudentsScreen from '../screens/StudentsScreen';
import LogoutScreen from '../screens/LogoutScreen';
import LoginScreen from '../screens/LoginScreen';
import ItineraryDetailsScreen from '../screens/ItineraryDetailsScreen';
import BookDetailsScreen from '../screens/BookDetailsScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';

import Spinner from '../components/Spinner';


import { AuthContext } from '../context/AuthProvider';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerNavigator = () => {
  const {authState, loadToken, logout} = useContext(AuthContext);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const loadjwt = async () => {
      setloading(true);
      try {
        await loadToken();
      } catch (err) {
        await logout();
      }
      setloading(false);
    };
    loadjwt();
  }, []);

  if (loading) return <Spinner />;

  if (!authState.authenticated) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Init">
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Registro" component={RegisterScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  } 
  else
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Inicio" component={HomeScreen} options={{headerShown: false}}/>
        <Drawer.Screen name="Itinerarios" component={ItinerariesScreen} />
        <Drawer.Screen name="Libros" component={BooksScreen} />
        <Drawer.Screen name="Mi perfil" component={ProfileScreen} />
        <Drawer.Screen name="Alumnos" component={StudentsScreen} />
        <Drawer.Screen name="Cerrar sesión" component={LogoutScreen} />

        <Drawer.Screen name="Detalles Itinerarios" component={ItineraryDetailsScreen} />
        <Drawer.Screen name="Detalles Libros" component={BookDetailsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

// const Stack = createStackNavigator();

// const screenOptionStyle = {
//   headerStyle: {
//     backgroundColor: '#9E1E16',
//   },
//   headerTintColor: 'white',
//   headerBackTitle: 'Back',
// };

// const StackNavigator = () => {
//   return (
//     <Stack.Navigator screenOptions={screenOptionStyle}>
//       <Stack.Screen
//         name="Detalles"
//         component={DetailsScreen}
//         options={{headerShown: false}}
//       />
//     </Stack.Navigator>
//   );
// };

export default DrawerNavigator;
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
import Calendar from '../components/Calendar';

import { AuthContext } from '../context/AuthProvider';

import HomeStackNavigator from './stack-navigators/HomeStackNavigator';
import ItinerariesStackNavigator from './stack-navigators/ItinerariesStackNavigator';
import BookStackNavigator from './stack-navigators/BookStackNavigator';
import ProfileStackNavigator from './stack-navigators/ProfileNavigator';
import StudentsStackNavigator from './stack-navigators/StudentsStackNavigator';
import BookDetailsStackNavigator from './stack-navigators/BookDetailsStackNavigator';
import ItineraryDetailsStackNavigator from './stack-navigators/ItineraryDetailsStackNavigator';
import NewBookStackNavigator from './stack-navigators/NewBookStackNavigator';


import { routes, screens } from './RouterItems';
import LogoutStackNavigator from './stack-navigators/LogoutStackNavigator';

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
      <Drawer.Navigator initialRouteName="nav">
        <Drawer.Screen name={screens.Home} component={HomeStackNavigator} options={{headerShown: false}}/>
        <Drawer.Screen name={screens.Itineraries} component={ItinerariesStackNavigator} />
        <Drawer.Screen name={screens.Books} component={BookStackNavigator} />
        <Drawer.Screen name={screens.MyProfile} component={ProfileStackNavigator} />
        <Drawer.Screen name={screens.Students} component={StudentsStackNavigator} />
        <Drawer.Screen name={screens.Logout} component={LogoutStackNavigator} />

        <Drawer.Screen name={screens.ItineraryDetails} component={ItineraryDetailsStackNavigator} options={{
          title: 'Detalles itinerario',
          showInDrawer: false,
          headerRight: () => (
            <View style={styles.headerRight}>
              <Icon name="bell" size={20} color="#fff" />
            </View>
          ),
        }}/>
        <Drawer.Screen name={screens.BookDetails} component={BookDetailsStackNavigator} />
        <Drawer.Screen name={screens.NewBook} component={NewBookStackNavigator} />
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
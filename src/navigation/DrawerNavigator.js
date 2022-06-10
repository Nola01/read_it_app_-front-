import React, {useContext, useEffect, useState} from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

import Spinner from '../components/Spinner';

import { AuthContext } from '../context/AuthProvider';

import HomeStackNavigator from './stack-navigators/HomeStackNavigator';
import ItinerariesStackNavigator from './stack-navigators/ItinerariesStackNavigator';
import BookStackNavigator from './stack-navigators/BookStackNavigator';
import ProfileStackNavigator from './stack-navigators/ProfileNavigator';
import StudentsStackNavigator from './stack-navigators/StudentsStackNavigator';
import BookDetailsStackNavigator from './stack-navigators/BookDetailsStackNavigator';
import ItineraryDetailsStackNavigator from './stack-navigators/ItineraryDetailsStackNavigator';
import NewBookStackNavigator from './stack-navigators/NewBookStackNavigator';

import ItineraryDetailsScreen from '../screens/ItineraryDetailsScreen';
import BookDetailsScreen from '../screens/BookDetailsScreen';
import NewBookScreen from '../screens/NewBookScreen';


import { routes, screens } from './RouterItems';
import LogoutStackNavigator from './stack-navigators/LogoutStackNavigator';
import Icon from 'react-native-vector-icons/FontAwesome'

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const CustomDrawerContent = (props) => {
  const currentRouteName = props.nav()?.getCurrentRoute()?.name
  return (
    <DrawerContentScrollView {...props}>
      {
        routes.filter(route => route.showInDrawer).map((route) => {
          const focusedRoute = routes.find(r => r.name === currentRouteName)
          const focused = focusedRoute ?
            route.name === focusedRoute?.focusedRoute :
            route.name === screens.HomeStack
          return (
            <DrawerItem
              key={route.name}
              label={() => (
                <Text style={focused ? styles.drawerLabelFocused : styles.drawerLabel}>
                  {route.title}
                </Text>
              )}
              onPress={() => props.navigation.navigate(route.name)}
              style={[styles.drawerItem, focused ? styles.drawerItemFocused : null]}
            />
          )
        })
      }
    </DrawerContentScrollView>
  )
}

const DrawerNavigator = ({ nav }) => {
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
      
      <Stack.Navigator initialRouteName="Init">
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Registro" component={RegisterScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
      
    );
  } 
  else
  return (
    
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: '#551E18',
          height: 50,
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.headerLeft}>
            <Icon name="bars" size={20} color="#fff" />
          </TouchableOpacity>
        ),
      })}
      drawerContent={(props) => <CustomDrawerContent {...props} nav={nav} />}
    >
      <Drawer.Screen name={screens.Home} component={HomeStackNavigator} options={{headerShown: false}}/>
      <Drawer.Screen name={screens.Itineraries} component={ItinerariesStackNavigator} />
      <Drawer.Screen name={screens.Books} component={BookStackNavigator} />
      <Drawer.Screen name={screens.MyProfile} component={ProfileStackNavigator} />
      <Drawer.Screen name={screens.Students} component={StudentsStackNavigator} />
      <Drawer.Screen name={screens.Logout} component={LogoutStackNavigator} />

      <Drawer.Screen name={screens.ItineraryDetails} component={ItineraryDetailsScreen} />
      <Drawer.Screen name={screens.BookDetails} component={BookDetailsScreen} />
      <Drawer.Screen name={screens.NewBook} component={NewBookScreen} />
    </Drawer.Navigator>
    
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

const styles = StyleSheet.create({
  headerLeft: {
    marginLeft: 15,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  headerRight: {
    marginRight: 15,
  },
  // drawer content
  drawerLabel: {
    fontSize: 14,
  },
  drawerLabelFocused: {
    fontSize: 14,
    color: '#551E18',
    fontWeight: '500',
  },
  drawerItem: {
    height: 50,
    justifyContent: 'center'
  },
  drawerItemFocused: {
    backgroundColor: '#ba9490',
  },
})


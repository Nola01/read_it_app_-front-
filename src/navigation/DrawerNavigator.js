import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

import React, {useContext, useEffect, useState} from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { AuthContext } from '../context/AuthProvider';
import { SettingsContext } from '../context/SettingsProvider';
import { routes, screens } from './RouterItems';

import Spinner from '../components/Spinner';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

import HomeStackNavigator from './HomeStackNavigator';


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
  // const {color} = useContext(SettingsContext);
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
      
      <Stack.Navigator initialRouteName="Start">
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
          backgroundColor: '#FFFFFF',
          height: 60,
        },
        headerLeft: () => (
          <TouchableOpacity style={styles.headerLeft}>
            <Ionicons onPress={() => navigation.toggleDrawer()} name="menu" size={30} color="#000000" />
            <Ionicons style={styles.goBack} onPress={() => navigation.goBack()} name="ios-arrow-back-outline" size={30} color="#000000" />
          </TouchableOpacity>

        ),
      })}
      drawerContent={(props) => <CustomDrawerContent {...props} nav={nav} />}
    >
      <Drawer.Screen name={' '} component={HomeStackNavigator} options/>
    </Drawer.Navigator>
    
  );
}

export default DrawerNavigator;

const styles = StyleSheet.create({
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    margin: 15,
  },
  goBack: {
    marginLeft: 10
  },  
  drawerLabel: {
    fontSize: 14,
  },
  drawerLabelFocused: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  drawerItem: {
    height: 50,
    justifyContent: 'center'
  },
  drawerItemFocused: {
    backgroundColor: '#6299E0',
  },
})


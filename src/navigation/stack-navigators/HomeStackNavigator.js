import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from '../../screens/HomeScreen'
import { screens } from '../RouterItems'

const Stack = createStackNavigator()

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={screens.Home} component={HomeScreen} />
    </Stack.Navigator>
  )
}

export default HomeStackNavigator
import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import LogoutScreen from '../../screens/LogoutScreen'
import { screens } from '../RouterItems'

const Stack = createStackNavigator()

const LogoutStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={screens.Logout} component={LogoutScreen} />
    </Stack.Navigator>
  )
}

export default LogoutStackNavigator
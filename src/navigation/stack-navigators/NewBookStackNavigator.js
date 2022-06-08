import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import NewBookScreen from '../../screens/NewBookScreen'
import { screens } from '../RouterItems'

const Stack = createStackNavigator()

const NewBookStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={screens.NewBook} component={NewBookScreen} />
    </Stack.Navigator>
  )
}

export default NewBookStackNavigator
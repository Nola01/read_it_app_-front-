import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import StudentsScreen from '../../screens/StudentsScreen'
import { screens } from '../RouterItems'

const Stack = createStackNavigator()

const StudentsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={screens.Students} component={StudentsScreen} />
    </Stack.Navigator>
  )
}

export default StudentsStackNavigator
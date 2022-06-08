import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import BooksScreen from '../../screens/BooksScreen'
import { screens } from '../RouterItems'

const Stack = createStackNavigator()

const BookStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={screens.Books} component={BooksScreen} />
    </Stack.Navigator>
  )
}

export default BookStackNavigator
import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import BookDetailsScreen from '../../screens/BookDetailsScreen'
import { screens } from '../RouterItems'

const Stack = createStackNavigator()

const BookDetailsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={screens.BookDetails} component={BookDetailsScreen} />
    </Stack.Navigator>
  )
}

export default BookDetailsStackNavigator
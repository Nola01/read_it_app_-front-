import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import ItineraryDetailsScreen from '../../screens/ItineraryDetailsScreen'
import { screens } from '../RouterItems'

const Stack = createStackNavigator()

const ItineraryDetailsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={screens.ItineraryDetails} component={ItineraryDetailsScreen} />
    </Stack.Navigator>
  )
}

export default ItineraryDetailsStackNavigator
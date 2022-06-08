import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import ItinerariesScreen from '../../screens/itinerariesScreen'
import { screens } from '../RouterItems'

const Stack = createStackNavigator()

const ItinerariesStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={screens.Itineraries} component={ItinerariesScreen} />
    </Stack.Navigator>
  )
}

export default ItinerariesStackNavigator
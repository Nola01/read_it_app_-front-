import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import NewItineraryScreen from '../../screens/NewItineraryScreen'
import { screens } from '../RouterItems'

const Stack = createStackNavigator()

const NewItineraryStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={screens.NewItinerary} component={NewItineraryScreen} />
    </Stack.Navigator>
  )
}

export default NewItineraryStackNavigator
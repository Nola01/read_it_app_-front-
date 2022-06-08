import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import ProfileScreen from '../../screens/ProfileScreen'
import { screens } from '../RouterItems'

const Stack = createStackNavigator()

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={screens.MyProfile} component={ProfileScreen} />
    </Stack.Navigator>
  )
}

export default ProfileStackNavigator
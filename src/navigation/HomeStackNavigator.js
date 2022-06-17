import React, {useContext} from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from '../screens/HomeScreen'
import { screens } from './RouterItems'
import ItinerariesScreen from '../screens/itinerariesScreen'
import ItineraryDetailsScreen from '../screens/ItineraryDetailsScreen'
import BooksScreen from '../screens/BooksScreen'
import BookDetailsScreen from '../screens/BookDetailsScreen'
import ProfileScreen from '../screens/ProfileScreen'
import StudentsScreen from '../screens/StudentsScreen'
import NewBookScreen from '../screens/NewBookScreen'
import NewItineraryScreen from '../screens/NewItineraryScreen'
import SelectBooks from '../screens/SelectBooks'
import SelectStudents from '../screens/SelectStudents'
import LogoutScreen from '../screens/LogoutScreen'

import { AuthContext } from '../context/AuthProvider'

const Stack = createStackNavigator()

const HomeStackNavigator = () => {
  const {authState} = useContext(AuthContext);

  const isTeacher = authState.role === 'profesor' ? true : false
  
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={screens.Home} component={HomeScreen} />
      <Stack.Screen name={screens.Itineraries} component={ItinerariesScreen} />
      <Stack.Screen name={screens.Books} component={BooksScreen} />
      <Stack.Screen name={screens.MyProfile} component={ProfileScreen} />
      <Stack.Screen name={screens.Students} component={StudentsScreen} />
      <Stack.Screen name={screens.Logout} component={LogoutScreen} />

      <Stack.Screen name={screens.ItineraryDetails} component={ItineraryDetailsScreen} />
      <Stack.Screen name={screens.BookDetails} component={BookDetailsScreen} />
      <Stack.Screen name={screens.NewBook} component={NewBookScreen} />
      <Stack.Screen name={screens.NewItinerary} component={NewItineraryScreen} />
      <Stack.Screen name={screens.SelectBooks} component={SelectBooks} />
      <Stack.Screen name={screens.SelectStudents} component={SelectStudents} /> 
    </Stack.Navigator>
  )
}

export default HomeStackNavigator
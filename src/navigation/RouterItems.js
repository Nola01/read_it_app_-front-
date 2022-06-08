import * as React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

export const screens = {
    Home: 'Home',
    Itineraries: 'Itineraries',
    Books: 'Books',
    MyProfile: 'MyProfile',
    Students: 'Students',
    Logout: 'Logout',
    ItineraryDetails: 'ItineraryDetails',
    BookDetails: 'BookDetails',
}

export const routes = [
    {
        name: screens.Home,
        focusedRoute: screens.Home,
        title: 'Home',
        showInTab: false,
        showInDrawer: true,
        icon: (focused) =>
            <Icon name="home" size={30} color={focused ? '#551E18' : '#000'} />,
    },
    {
        name: screens.Itineraries,
        focusedRoute: screens.Itineraries,
        title: 'Itineraries',
        showInTab: false,
        showInDrawer: true,
        icon: (focused) =>
            <Icon name="home" size={30} color={focused ? '#551E18' : '#000'} />,
    },
    {
        name: screens.MyProfile,
        focusedRoute: screens.MyProfile,
        title: 'My profile',
        showInTab: false,
        showInDrawer: true,
        icon: (focused) =>
            <Icon name="home" size={30} color={focused ? '#551E18' : '#000'} />,
    },
    {
        name: screens.Students,
        focusedRoute: screens.Students,
        title: 'Students',
        showInTab: false,
        showInDrawer: true,
        icon: (focused) =>
            <Icon name="home" size={30} color={focused ? '#551E18' : '#000'} />,
    },
    {
        name: screens.Logout,
        focusedRoute: screens.Logout,
        title: 'Logout',
        showInTab: false,
        showInDrawer: true,
        icon: (focused) =>
            <Icon name="home" size={30} color={focused ? '#551E18' : '#000'} />,
    },
    {
        name: screens.ItineraryDetails,
        focusedRoute: screens.ItineraryDetails,
        title: 'Itinerary Details',
        showInTab: false,
        showInDrawer: false,
        icon: (focused) =>
            <Icon name="home" size={30} color={focused ? '#551E18' : '#000'} />,
    },
    {
        name: screens.BookDetails,
        focusedRoute: screens.BookDetails,
        title: 'Book Details',
        showInTab: false,
        showInDrawer: false,
        icon: (focused) =>
            <Icon name="home" size={30} color={focused ? '#551E18' : '#000'} />,
    },
]

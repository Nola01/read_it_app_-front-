import * as React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

export const screens = {
    Home: 'Inicio',
    Itineraries: 'Itinerarios',
    Books: 'Libros',
    MyProfile: 'Mi perfil',
    Students: 'Alumnos',
    Logout: 'Cerrar sesión',
    ItineraryDetails: 'Detalles itinerario',
    BookDetails: 'Detalles libro',
    NewBook: 'Nuevo libro',
    NewItinerary: 'Nuevo itinerario',
    SelectBooks: 'Seleccionar libros',
    SelectStudents: 'Seleccionar alumnos'
}

export const routes = [
    {
        name: screens.Home,
        focusedRoute: screens.Home,
        title: 'Inicio',
        showInTab: false,
        showInDrawer: true,
        icon: (focused) =>
            <Icon name="home" size={30} color={focused ? '#551E18' : '#000'} />,
    },
    {
        name: screens.Itineraries,
        focusedRoute: screens.Itineraries,
        title: 'Itinerarios',
        showInTab: false,
        showInDrawer: true,
        icon: (focused) =>
            <Ionicons name="home" size={30} color={focused ? '#551E18' : '#000'} />,
    },
    {
        name: screens.Books,
        focusedRoute: screens.Books,
        title: 'Libros',
        showInTab: false,
        showInDrawer: true,
        icon: (focused) =>
            <Ionicons name="home" size={30} color={focused ? '#551E18' : '#000'} />,
    },
    {
        name: screens.MyProfile,
        focusedRoute: screens.MyProfile,
        title: 'Mi perfil',
        showInTab: false,
        showInDrawer: true,
        icon: (focused) =>
            <Ionicons name="home" size={30} color={focused ? '#551E18' : '#000'} />,
    },
    {
        name: screens.Students,
        focusedRoute: screens.Students,
        title: 'Alumnos',
        showInTab: false,
        showInDrawer: true,
        icon: (focused) =>
            <Ionicons name="home" size={30} color={focused ? '#551E18' : '#000'} />,
    },
    {
        name: screens.Logout,
        focusedRoute: screens.Logout,
        title: 'Cerrar sesión',
        showInTab: false,
        showInDrawer: true,
        icon: (focused) =>
            <Ionicons name="home" size={30} color={focused ? '#551E18' : '#000'} />,
    },
    {
        name: screens.ItineraryDetails,
        focusedRoute: screens.ItineraryDetails,
        title: 'Detalles itinerario',
        showInTab: false,
        showInDrawer: false,
        icon: (focused) =>
            <Ionicons name="home" size={30} color={focused ? '#551E18' : '#000'} />,
    },
    {
        name: screens.BookDetails,
        focusedRoute: screens.BookDetails,
        title: 'Detalles libro',
        showInTab: false,
        showInDrawer: false,
        icon: (focused) =>
            <Ionicons name="home" size={30} color={focused ? '#551E18' : '#000'} />,
    },
    {
        name: screens.NewBook,
        focusedRoute: screens.NewBook,
        title: 'Nuevo libro',
        showInTab: false,
        showInDrawer: false,
        icon: (focused) =>
            <Ionicons name="home" size={30} color={focused ? '#551E18' : '#000'} />,
    },
    {
        name: screens.NewItinerary,
        focusedRoute: screens.NewItinerary,
        title: 'Nuevo itinerario',
        showInTab: false,
        showInDrawer: false,
        icon: (focused) =>
            <Ionicons name="home" size={30} color={focused ? '#551E18' : '#000'} />,
    },
    {
        name: screens.SelectBooks,
        focusedRoute: screens.SelectBooks,
        title: 'Seleccionar libros',
        showInTab: false,
        showInDrawer: false,
        icon: (focused) =>
            <Ionicons name="home" size={30} color={focused ? '#551E18' : '#000'} />,
    },
    {
        name: screens.SelectStudents,
        focusedRoute: screens.SelectStudents,
        title: 'Seleccionar alumnos',
        showInTab: false,
        showInDrawer: false,
        icon: (focused) =>
            <Ionicons name="home" size={30} color={focused ? '#551E18' : '#000'} />,
    },
]

import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import { View, StyleSheet, FlatList, Pressable, ScrollView, Typography } from 'react-native';
import { Avatar, Text, Card, Title, Paragraph } from 'react-native-paper';

import { AuthContext } from '../context/AuthProvider';


import Calendar from '../components/Calendar';


const HomeScreen = ({navigation}) => {
    const {authState} = useContext(AuthContext);

    const user = authState.user;

    const goToItineraries = () => {
        navigation.jumpTo('Itinerarios');
    };
    
    return (
        <SafeAreaView style={styles.container}>
                <Card style={styles.header}>
                    <Text style={styles.headerText}>Bienvenido/a {user.name}</Text>
                    <Text>   </Text>
                </Card>

                {/* <Text style={styles.itineraries} onPress={() => goToItineraries()}> Ver todos tus itinerarios </Text> */}
    
                <View style={styles.calendar}>
                    <Calendar navigation={navigation} />        
                </View>
        </SafeAreaView>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginVertical: 10,
        marginHorizontal: 10,
    },
    header: {
        flex: 1,
        position: 'absolute',
        top: -15,
        left: -10,
        right: -10,
        backgroundColor: '#fff',
        borderRadius: 20
    },
    headerText: {
        flex: 1,
        top: 0,
        fontSize: 20,
        margin: 10,
        paddingTop: 10
    },
    itineraries: {
        marginTop: 90,
    },
    calendar: {
        flex: 1,
        marginTop: 100,
    }      
});

import React, {useContext} from 'react';
import { StyleSheet } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { Avatar } from 'react-native-paper';

import { AuthContext } from '../context/AuthProvider';

const ProfileScreen = ({ navigation }) => {

    const { authState } = useContext(AuthContext);

    return (
        <SafeAreaView style={styles.container}>
            <Avatar.Image style={styles.avatar} size={50} source={require('../assets/default-user-icon.jpg')} />
            <Text style={styles.text}>Nombre: {authState.user.name}</Text>
            <Text style={styles.text}>Correo: {authState.user.email}</Text>
            
        </SafeAreaView>
    );
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginVertical: 10,
        marginHorizontal: 10,
        alignItems: 'center', 
        justifyContent: 'center'
    },
    avatar: {
        backgroundColor: '#ffffff',
        height:'10%',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',

    }
});
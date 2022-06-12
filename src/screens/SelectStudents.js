import BouncyCheckbox from "react-native-bouncy-checkbox";
import React, {useContext, useState, useEffect} from 'react';
import { Button, View, FlatList, Pressable, StyleSheet } from 'react-native';
import { Card, Text, Title } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from "react-native-safe-area-context";

import { ApiContext } from '../context/ApiProvider';
import { NewItineraryContext } from "../context/NewItineraryProvider";

const SelectStudents = ({navigation}) => {
    const {getUsers} = useContext(ApiContext);

    const newItineraryContext = useContext(NewItineraryContext);
    const {studentsState} = useContext(NewItineraryContext);

    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([])
    const [refreshing, setrefreshing] = useState(false);


    const loadStudents = async () => {
        setrefreshing(true);
        try {
            const users = await getUsers();
            const students = users.filter(user => user.role === 'alumno')
            setStudents(students);
        } catch (err) {
            console.log(err.response);
        }
        setrefreshing(false);
    };

    useEffect(() => {
        loadStudents();
    }, []);

    const checkedStudent = (item) => {
        if (!selectedStudents.includes(item.id_user)) {
            selectedStudents.push(item.id_user)
            console.log('push', selectedStudents);
        } else {
            const newStudents = selectedStudents.filter((id) => id !== item.id_user);
            console.log('new list', newStudents);
            setSelectedStudents(newStudents)
        }

        console.log(selectedStudents);
    }

    const confirmStudents = () => {
        newItineraryContext.setStudentsState(selectedStudents)
        console.log('context students', studentsState);
        navigation.navigate('Nuevo itinerario')
    }


    const renderItem = ({item}) => {
        return (

            <Card style={styles.item}>
                <Card.Title title={item.name} subtitle={`Correo electrónico: ${item.email}`} />
                <Card.Content>
                    <Title></Title>
                    <BouncyCheckbox
                        size={25}
                        fillColor="red"
                        unfillColor="#FFFFFF"
                        text="Seleccionar"
                        iconStyle={{ borderColor: "red" }}
                        textStyle={{ fontFamily: "JosefinSans-Regular" }}
                        onPress={() => {
                            checkedStudent(item)
                        }}
                    />
                </Card.Content>
            </Card>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Ionicons onPress={() => confirmStudents()} name="checkmark-circle-outline" size={30} />
            
            <View>
              <Text>Lista de libros</Text>
            </View>
            <FlatList
                data={students}
                renderItem={renderItem}
                keyExtractor={item => item.isbn}
                onRefresh={loadStudents}
                refreshing={refreshing}
            />
        </SafeAreaView>
    )
}

export default SelectStudents;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      marginVertical: 10,
      marginHorizontal: 10,
    },
    item: {
      marginTop: 10,
      borderRadius: 5
    }
});
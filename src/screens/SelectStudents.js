import BouncyCheckbox from "react-native-bouncy-checkbox";
import React, {useContext, useState, useEffect} from 'react';
import { Button, View, FlatList, Pressable, StyleSheet } from 'react-native';
import { Card, Text, Title } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from "react-native-safe-area-context";

import { ApiContext } from '../context/ApiProvider';
import { NewItineraryContext } from "../context/NewItineraryProvider";

const SelectStudents = ({navigation}) => {
    const {getStudents} = useContext(ApiContext);

    const newItineraryContext = useContext(NewItineraryContext);
    const {students} = useContext(NewItineraryContext);

    const [studentsList, setStudentsList] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([])
    const [refreshing, setrefreshing] = useState(false);

    const [editStudents, seteditstudents] = useState({});
    const [isEdit, setisedit] = useState(false); 


    const loadStudents = async () => {
        setrefreshing(true);
        try {
            const onEditStudents = route.params;
            console.log('students', onEditStudents);
            if (onEditStudents.length !== 0) {
                seteditstudents(onEditStudents)
                setSelectedStudents(onEditStudents)
                setisedit(true)
            } else {
                setselectedbooks(students)
                setisedit(false)
            }

            const users = await getStudents();
            console.log(users);
            setStudentsList(users);
        } catch (err) {
            console.log(err.response);
        }
        setrefreshing(false);
    };

    useEffect(() => {
        loadStudents();
    }, []);

    const checkedStudent = async (item) => {
        if (!selectedStudents.includes(item.id_user)) {
            selectedStudents.push(item.id_user)
            console.log('push', selectedStudents);
        } else {
            let promises = []
            promises = selectedStudents.filter((id) => id !== item.id_user);
            const newStudents = await Promise.all(promises)
            console.log('new list', newStudents);
            setSelectedStudents(newStudents)
        }

        console.log(selectedStudents);
    }

    const confirmStudents = () => {
        newItineraryContext.setStudents(selectedStudents)
        console.log('context students', students);
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
                        isChecked={isEdit ? editStudents.includes(item.id_user) : selectedStudents.includes(item.id_user)}
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

            <FlatList
                data={studentsList}
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
import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import { View, StyleSheet, FlatList, Pressable, ToastAndroid } from 'react-native';
import { Text, Card, FAB, Title, Paragraph } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { ApiContext } from '../context/ApiProvider';
import { AuthContext } from '../context/AuthProvider';


const ItinerariesScreen = ({navigation}) => {
    const {getItineraries, deleteItinerary} = useContext(ApiContext);
    const {authState} = useContext(AuthContext);

    const [itineraries, setitineraries] = useState([]);
    const [refreshing, setrefreshing] = useState(false);

    const loadItineraries = async () => {
        setrefreshing(true);
        try {
            const itineraries = await getItineraries();
            if (authState.user.role === 'profesor') {
                // console.log(authState.user.id_user);
                let teacherItineraries = []
                itineraries.map(itinerary => {
                    // console.log(itinerary.teacher.id_user === authState.user.id_user);
                    if (itinerary.teacher.id_user === authState.user.id_user) {
                        teacherItineraries.push(itinerary)
                    }
                })

                // console.log('profesor', teacherItineraries);
                setitineraries(teacherItineraries);
            } else {
                const studentItineraries = []
                itineraries.map(itinerary => {
                    if (itinerary.students) {
                        itinerary.students.map(student => {
                            // console.log(student.id_user === authState.user.id_user);
                            if (student.id_user === authState.user.id_user) {
                                studentItineraries.push(itinerary)
                            }
                            // console.log('a', studentItineraries);
                            setitineraries(studentItineraries)
                            // console.log('itineraries', itineraries);
                        })
                    }
                })
            }
          
        } catch (err) {
          console.log(err.response);
        }
        setrefreshing(false);
    };

    useEffect(() => {
        loadItineraries();
    }, []);

    const goToDetails = (item) => {
        //console.log(item.name);
        navigation.jumpTo('Detalles itinerario', item);
    };

    const goToAdd = () => {
        navigation.jumpTo('Nuevo itinerario');
    }

    const goEdit = (item) => {
        console.log(item);
        navigation.navigate('Nuevo itinerario', item);
    }

    const handleDelete = async (item) => {
        console.log(item);
        const response = await deleteItinerary(item.itinerary.id_itinerary);
        console.log(response);
        if (response.ok === true) {
            ToastAndroid.show(response.msg, ToastAndroid.LONG)
            loadItineraries();
        } else {
            ToastAndroid.show(response.msg, ToastAndroid.LONG)
        }
        
    }

    

    const renderItem = ({item}) => {
        return (
            <Pressable onPress={() => goToDetails(item)}>
                <Card style={styles.item}>
                    <Card.Title title={item.itinerary.name} subtitle={`Departamento: ${item.itinerary.department}`} />
                    <Card.Content>
                        <Title></Title>
                        {item.books ? 
                            <Paragraph>Libros: {item.books.length}</Paragraph>
                            :
                            <Paragraph>Libros: 0</Paragraph>
                        }
                    </Card.Content>
                    <Card.Actions style={styles.actions}>
                        <Ionicons style={styles.icon} name="pencil" size={30} color={'#551E18'} onPress={() => goEdit(item)}/>
                        <Ionicons style={styles.icon} name="trash" size={30} color={'#551E18'} onPress={() => handleDelete(item)}/>
                    </Card.Actions>
                </Card>
            </Pressable>
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Lista de itinerarios</Text>
            </View>
            <FlatList
                data={itineraries}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                onRefresh={loadItineraries}
                refreshing={refreshing}
            />
            {authState.user.role === 'profesor' ?
                <FAB style={styles.fab} small icon="plus" onPress={() => goToAdd()} />
                :
                <></>
            }
        </SafeAreaView>
    );
}

export default ItinerariesScreen;

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
  },
  fab: {
    backgroundColor: 'blue',
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  actions: {
    margin: 10
  },
  icon: {
    fontSize: 30,
    marginRight: 40
  }
});
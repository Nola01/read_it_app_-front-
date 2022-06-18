import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import { View, StyleSheet, FlatList, Pressable, ToastAndroid } from 'react-native';
import { Text, Card, FAB, Title, Paragraph, Searchbar } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NewItineraryContext } from '../context/NewItineraryProvider';

import { ApiContext } from '../context/ApiProvider';
import { AuthContext } from '../context/AuthProvider';

const timeToString = (dateWithTime) => {
    let date = new Date(dateWithTime)
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let dt = date.getDate();
  
    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }
  
    const newDate1 = dt +'-' + month + '-' + year;
    const newDate2 = year +'-' + month + '-' + dt;
    return [newDate1, newDate2];
  }


const ItinerariesScreen = ({navigation}) => {
    const {getItineraries, deleteItinerary} = useContext(ApiContext);
    const {authState} = useContext(AuthContext);
    const {books} = useContext(NewItineraryContext)

    const [itineraries, setitineraries] = useState([]);
    const [refreshing, setrefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const loadItineraries = async () => {
        setrefreshing(true);
        try {
            const itineraries = await getItineraries();
            if (authState.user.role === 'profesor') {
                let teacherItineraries = []
                itineraries.map(itinerary => {
                    if (itinerary.teacher.id_user === authState.user.id_user) {
                        teacherItineraries.push(itinerary)
                    }
                })

                setitineraries(teacherItineraries.reverse());
            } else {
                const studentItineraries = []
                itineraries.map(itinerary => {
                    if (itinerary.students) {
                        itinerary.students.map(student => {
                            if (student.id_user === authState.user.id_user) {
                                studentItineraries.push(itinerary)
                            }
                            setitineraries(studentItineraries.reverse())
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
    }, [navigation]);

    const onChangeSearch = query => {
        const filterItineraries = [];
        itineraries.forEach(itinerary => {
          if (itinerary.itinerary.name.includes(query) || itinerary.itinerary.department.includes(query)) {
            filterItineraries.push(itinerary);
          }
        });
        console.log(filterItineraries);
        console.log(query);
        if ((query == '')) {
          loadItineraries();
        }
        if (filterItineraries) {
          setitineraries(filterItineraries);
        } 
        setSearchQuery(query);
    };

    const goToDetails = (item) => {
        navigation.navigate('Detalles itinerario', item);
    };

    const goToAdd = () => {
        navigation.navigate('Nuevo itinerario');
    }

    const goEdit = (item) => {
        navigation.navigate('Nuevo itinerario', item);
    }

    const handleDelete = async (item) => {
        try {
            const response = await deleteItinerary(item.itinerary.id_itinerary);
            loadItineraries();
            ToastAndroid.show(response.msg, ToastAndroid.LONG)
        } catch (error) {
            ToastAndroid.show('Error al eliminar itinerario', ToastAndroid.LONG)
        }
    }

    const renderItem = ({item}) => {
        return (
            <Pressable onPress={() => goToDetails(item)}>
                <Card style={styles.item}>
                    <Card.Title title={item.itinerary.name} subtitle={`Departamento: ${item.itinerary.department}`} />
                    <Card.Content>
                        <Text>Fin: {timeToString(item.itinerary.endDate)[0]}</Text>
                        {item.books ? 
                            <Paragraph>Libros: {item.books.length}</Paragraph>
                            :
                            <Paragraph>Libros: 0</Paragraph>
                        }
                    </Card.Content>
                    <Card.Actions style={styles.actions}>
                        <Ionicons style={styles.icon} name="pencil" size={30} color={'#6299E0'} onPress={() => goEdit(item)}/>
                        <Ionicons style={styles.icon} name="trash" size={30} color={'#6299E0'} onPress={() => handleDelete(item)}/>
                    </Card.Actions>
                </Card>
            </Pressable>
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <Searchbar
                placeholder="Buscar..."
                onChangeText={query => onChangeSearch(query)}
                value={searchQuery}
            />
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
    backgroundColor: '#4C59FA',
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
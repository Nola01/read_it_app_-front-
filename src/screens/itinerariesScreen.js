import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import { View, StyleSheet, FlatList, Pressable, ToastAndroid } from 'react-native';
import { Text, Card, FAB, Title, Paragraph, Searchbar } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { ApiContext } from '../context/ApiProvider';
import { AuthContext } from '../context/AuthProvider';

const timeToString = (dateWithTime) => {
    // date = response.data.itinerary.endDate;
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

    const [itineraries, setitineraries] = useState([]);
    const [refreshing, setrefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

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
        //console.log(item.name);
        navigation.navigate('Detalles itinerario', item);
    };

    const goToAdd = () => {
        navigation.navigate('Nuevo itinerario');
    }

    const goEdit = (item) => {
        console.log(item);
        navigation.navigate('Nuevo itinerario', item);
    }

    const handleDelete = async (item) => {
        try {
            console.log(item);
            const response = await deleteItinerary(item.itinerary.id_itinerary);
            console.log(response);
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
                        <Ionicons style={styles.icon} name="pencil" size={30} color={'#551E18'} onPress={() => goEdit(item)}/>
                        <Ionicons style={styles.icon} name="trash" size={30} color={'#551E18'} onPress={() => handleDelete(item)}/>
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
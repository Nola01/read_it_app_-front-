import React, {useContext, useState} from 'react';
import { ActivityIndicator, View, StyleSheet, ToastAndroid } from 'react-native';
import { Avatar, Text, Card } from 'react-native-paper';
import { Agenda } from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { ApiContext } from '../context/ApiProvider';
import { AuthContext } from '../context/AuthProvider';


LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ],
  monthNamesShort: ['Ene.', 'Feb.', 'Mar', 'Abr', 'May', 'Jun', 'Jul.', 'Ago', 'Sep.', 'Oct', 'Nov', 'Dic.'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mie.', 'Jue.', 'Vie.', 'Sab.'],
  today: "Hoy"
};
LocaleConfig.defaultLocale = 'es';

const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
}

const Calendar = ({navigation}) => {
    const {authState} = useContext(AuthContext);

    const [loading, setloading] = useState(true);
    const [itineraries, setitineraries] = useState([]);
    const [items, setItems] = useState();
    const {getItineraries} = useContext(ApiContext);
    const {getItineraryById} = useContext(ApiContext);

    const getDate = (dateWithTime) => {
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

        const newDate = year+'-' + month + '-'+dt;
        return newDate;
    }

    const loadItems = async (day) => {
        try {
            if (loading) {
                ToastAndroid.show('Cargando itinerarios', ToastAndroid.LONG)
            }
            const items = items || {};
            let allItineraries = await getItineraries();
            setitineraries(allItineraries)

            // filter to only show active user itineraries
            if (authState.user.role === 'profesor') {
                let teacherItineraries = []
                allItineraries.map(itinerary => {
                    if (itinerary.teacher.id_user === authState.user.id_user) {
                        teacherItineraries.push(itinerary)
                    }
                })
                
                console.log('profesor', teacherItineraries);
                setitineraries(teacherItineraries);
                
            } else {
                const studentItineraries = []
                allItineraries.map(itinerary => {
                    if (itinerary.students) {

                        itinerary.students.map(student => {
                            if (student.id_user === authState.user.id_user) {
                                studentItineraries.push(itinerary)
                            }

                            setitineraries(studentItineraries)
                        })
                    }
                })
            }


            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = timeToString(time);

                // if the date is not inside 'items0'
                if (!items[strTime]) {

                    // this date is the key so we set it's value to an empty array
                    items[strTime] = [];

                    /*
                        for each itinerary, if it's date is equal to the current date, 
                        we add it to the events array (value) of this date (key)
                    */

                    itineraries.map((data) => {
                        if (getDate(data.itinerary.endDate) === strTime) {
                            items[strTime].push({
                                id: data.itinerary.id_itinerary,
                                name: data.itinerary.name,
                                day: strTime
                            });
                        } else {
                            return;
                        }
                    })
                }
            }
            setloading(false)
            setItems(items);
        } catch (error) {
            console.log(error);
        }
        
    }

    const goToDetails = async (item) => {
        try {
            console.log('item', item);
            const itinerary = await getItineraryById(item.id);
            console.log('itinerario', itinerary);
            // navigation.navigate('Detalles itinerario', itinerary);
        } catch (error) {
            ToastAndroid.show('Error al encontrar itinerario', ToastAndroid.SHORT)
        }
    };

    const renderItem = (item) => {
        return(
            <TouchableOpacity style={{marginTop: 17, marginRight: 10}} onPress={() => goToDetails(item)}>
                <Card>
                    <Card.Content>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text>{item.name}</Text>
                            <Avatar.Image size={50} source={require('../assets/book.jpg')} />
                        </View>
                    </Card.Content>
                </Card>        
            </TouchableOpacity>
        )
    }

    return (
        <Agenda
            items={items}
            loadItemsForMonth={loadItems}
            selected={new Date().toString()}
            renderItem={renderItem}
        />  
        
    );
}

export default Calendar;


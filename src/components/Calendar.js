import React, {useContext, useState} from 'react';
import { View } from 'react-native';
import { Avatar, Text, Card } from 'react-native-paper';

import { ApiContext } from '../context/ApiProvider';
import { Agenda } from 'react-native-calendars';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {LocaleConfig} from 'react-native-calendars';

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

const Calendar = () => {

    const [items, setItems] = useState();
    const {getItineraries} = useContext(ApiContext);

    const loadItems = async (day) => {
        const items = items || {};
        const itineraries = await getItineraries();

        for (let i = -15; i < 85; i++) {
            const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            const strTime = timeToString(time);
            // console.log(strTime);

            // if the date is not inside 'items0'
            if (!items[strTime]) {

                // this date is the key so we set it's value to an empty array
                items[strTime] = []; 

                /*
                for each itinerary, if it's date is equal to the current date, 
                we add it to the events array (value) of this date (key)
                */
                itineraries.map((itinerary) => {
                    if (itinerary.endDate === strTime) {
                        items[strTime].push({
                            id: itinerary.id,
                            name: itinerary.name,
                            day: strTime
                        });
                    } else {
                        return;
                    }
                })
                // console.log(items);
            }
        }
        setItems(items);
        
    }

    const renderItem = (item) => {
        return(
            <TouchableOpacity style={{marginTop: 17, marginRight: 10}}>
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


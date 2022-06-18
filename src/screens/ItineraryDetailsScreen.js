
import React from 'react';
import {Dimensions, Text, StyleSheet, ScrollView, Pressable, View, ToastAndroid} from 'react-native';
import {Card} from 'react-native-paper';

import Carousel from '../components/ImagesCarousel';

const screenWidth = Dimensions.get("window").width;

const ItineraryDetailsScreen = ({route, navigation}) => {

    const item = route.params;
    console.log('item', item);


    if (!item.books) {
        item.books = ['Este itinerario no tiene libros']
    }

    
    const images = []; 
    item.books.forEach(book => {
        images.push(book.image);
    });
    console.log(images);
    

    const goToDetails = (item) => {
        if (item.books === "Este itinerario no tiene libros") {
            ToastAndroid.show("Este itinerario no tiene libros", ToastAndroid.LONG)
        } else {
            navigation.navigate('Detalles libro', item);
        }
    };

    return (
        <ScrollView style={styles.viewBody}>
            <Card style={styles.item}>
                <Card.Title title={item.itinerary.name} subtitle={`Departamento: ${item.itinerary.department}`} />
                <Card.Content style={styles.content}>
                    <Text style={styles.text}>Libros: {item.books.length}</Text>
                    <Text style={styles.text}>Profesor/a: {item.teacher.name}</Text>
                    <Text style={styles.text}>Grupo: {item.itinerary.id_group}</Text>
                </Card.Content>
                <Pressable onPress={() => goToDetails(item)}>
                    <Card.Title title='Ver detalles de los libros >' onPress={() => goToDetails(item)} />
                </Pressable>
                <View style={styles.pagination}>
                    {
                        item.books.map(book => {
                            return <Text key={book.isbn} style={styles.paginationDot}>⬤</Text>
                        })
                    }
                </View>

                {/* <Carousel 
                    images={images}
                    height={600}
                    width={screenWidth}
                /> */}
                
            </Card>
        </ScrollView>
    );
};

export default ItineraryDetailsScreen;

const styles = StyleSheet.create({
    item: {
        grid: 1,
        marginTop: 10,
        borderRadius: 5,
        color: 'black',
    },
    content: {
        marginBottom: 10
    },
    viewBody: {
        flex: 1
    },
    pagination: {
        flexDirection: 'row',
        alignSelf: 'center',
        color: 'black'
    },
    paginationDot: {
        color: '#888',
        margin: 3
    }
});
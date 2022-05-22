
import React from 'react';
import {Dimensions, Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import {Card} from 'react-native-paper';

import Carousel from '../components/ImagesCarousel';

const screenWidth = Dimensions.get("window").width;

const ItineraryDetailsScreen = ({route, navigation}) => {
    const item = route.params;

    const images = []; 
    item.books.forEach(book => {
        //console.log(book.image);
        images.push(book.image);
    });

    const goToDetails = (item) => {
        navigation.jumpTo('Detalles Libros', item);
    };

  

    return (
    <ScrollView style={styles.viewBody}>
        <Card style={styles.item}>
            <Card.Title title={item.name} subtitle={`Departamento: ${item.department}`} />
            <Pressable onPress={() => goToDetails(item)}>
                <Carousel 
                    images={images}
                    height={700}
                    width={screenWidth}
                />
            </Pressable>
            <Card.Content>
                <Text style={styles.text}>Libros: {item.books.length}</Text>
                <Text style={styles.text}>{item.students[0].name}</Text>
            </Card.Content>
        </Card>
    </ScrollView>
    );
};

export default ItineraryDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginVertical: 10,
        marginHorizontal: 10,
    },
    item: {
        grid: 1,
        marginTop: 10,
        borderRadius: 5,
        color: 'black',
    },
    cover: {
        width: '50%',
        height: '60%'
    },
    viewBody: {
        flex: 1
    }
});
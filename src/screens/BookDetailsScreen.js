
import React from 'react';
import {Dimensions, Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import {Card} from 'react-native-paper';

const BookDetailsScreen = ({route, navigation}) => {
    const item = route.params;

    if (item.books) {
        const books = item.books;
        return (
            <ScrollView style={styles.viewBody}>
                <Text>Libros del itinerario: {item.name}</Text>
                {books.map((book) => (
                    <Card style={styles.item}>
                        {/* <Card.Cover style={styles.image} source={{ uri: book.image }} /> */}
                        <Card.Title title={book.title} subtitle={`Autor: ${book.author}`} />
                        <Card.Content>
                            {/* <Text style={styles.text}>Itinerarios: {book.itinerary.length}</Text> */}
                        </Card.Content>
                    </Card>
                ))}
            </ScrollView>
        )
    } else {
        return (
            <ScrollView style={styles.viewBody}>
                <Card style={styles.item}>
                    {/* <Card.Cover style={styles.image} source={{ uri: item.image }} /> */}
                    <Card.Title title={item.title} subtitle={`Autor: ${item.author}`} />
                    <Card.Content>
                        {/* <Text style={styles.text}>Itinerarios: {item.itinerary.length}</Text> */}
                    </Card.Content>
                </Card>      
            </ScrollView>
        )
    }
    
    //console.log(books);

};

export default BookDetailsScreen;

const styles = StyleSheet.create({
    item: {
        margin: 10,
        borderRadius: 5,
        color: 'black',
    },
    viewBody: {
        flex: 1
    },
    image: {
        flex: 1,
        flexDirection: 'row',
        width: '30%',
    }
});
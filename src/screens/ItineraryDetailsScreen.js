
import React from 'react';
import {Dimensions, Text, StyleSheet, ScrollView, Pressable, View} from 'react-native';
import {Card} from 'react-native-paper';

import Carousel from '../components/ImagesCarousel';

const screenWidth = Dimensions.get("window").width;

const ItineraryDetailsScreen = ({route, navigation}) => {

    // const state = {
    //     active: 0
    // }

    // const change = ({nativeEvent}) => {
    //     const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    //     if (slide !== state.active) {
    //         state.active = slide;
    //     }
    // }

    const item = route.params;
    const books = item.books;

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
            <Card.Content style={styles.content}>
                <Text style={styles.text}>Libros: {item.books.length}</Text>
                <Text style={styles.text}>{item.students[0].name}</Text>
            </Card.Content>
            <Pressable onPress={() => goToDetails(item)}>
                <Card.Title title='Ver detalles de los libros >' onPress={() => goToDetails(item)} />
            </Pressable>
            <View style={styles.pagination}>
                {
                    books.map(book => {
                        //console.log(book);
                        // return <Text key={book.isbn} style={book.isbn==state.active ? styles.paginationActiveDot : styles.paginationDot}>⬤</Text>
                        return <Text key={book.isbn} style={styles.paginationDot}>⬤</Text>
                    })
                }
            </View>

            <Carousel 
                images={images}
                height={600}
                width={screenWidth}
            />
            
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
    content: {
        marginBottom: 10
    },
    cover: {
        width: '50%',
        height: '60%'
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
    },
    paginationActiveDot: {
        color: '#fff',
        margin: 3
    }
});
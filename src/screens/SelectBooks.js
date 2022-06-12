import BouncyCheckbox from "react-native-bouncy-checkbox";
import React, {useContext, useState, useEffect} from 'react';
import { Button, View, FlatList, Pressable, StyleSheet } from 'react-native';
import { Card, Text, Title } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from "react-native-safe-area-context";

import { ApiContext } from '../context/ApiProvider';
import { NewItineraryContext } from "../context/NewItineraryProvider";

const SelectBooks = ({navigation}) => {
    const {getBooks} = useContext(ApiContext);

    const newItineraryContext = useContext(NewItineraryContext);
    const {booksState} = useContext(NewItineraryContext);

    const [books, setbooks] = useState([]);
    const [selectedBooks, setselectedbooks] = useState([])
    const [refreshing, setrefreshing] = useState(false);


    const loadBooks = async () => {
        setrefreshing(true);
        try {
          const books = await getBooks();
          setbooks(books);
        } catch (err) {
          console.log(err.response);
        }
        setrefreshing(false);
    };

    useEffect(() => {
        loadBooks();
    }, []);

    const checkedBook = (item) => {
        if (!selectedBooks.includes(item.isbn)) {
            selectedBooks.push(item.isbn)
            console.log('push', selectedBooks);
        } else {
            const newBooks = selectedBooks.filter((isbn) => isbn !== item.isbn);
            console.log('new list', newBooks);
            setselectedbooks(newBooks)
            // selectedBooks.filter(book => {
            //     if (book.title === item.title) {
                    
            //     }
            // })
        }

        // setischecked(!isChecked)
        // if (isChecked) {
        //     selectedBooks.push(item.isbn)
        // } else if (!isChecked) {
        //     const newBooks = selectedBooks.filter((isbn) => isbn !== item.isbn);
        //     console.log('new list', newBooks);
        //     setselectedbooks(newBooks)
        //     // selectedBooks.filter(book => {
        //     //     if (book.title === item.title) {
                    
        //     //     }
        //     // })
        // }
        console.log(selectedBooks);
    }

    const confirmBooks = () => {
        newItineraryContext.setBooksState(selectedBooks)
        console.log('context books', booksState);
        navigation.navigate('Nuevo itinerario')
    }


    const renderItem = ({item}) => {
        return (

            <Card style={styles.item}>
                <Card.Title title={item.title} subtitle={`Autor: ${item.author}`} />
                {/* <Card.Cover style={styles.image} source={{ uri: item.image }} /> */}
                <Card.Content>
                    <Title></Title>
                    <BouncyCheckbox
                        size={25}
                        fillColor="red"
                        unfillColor="#FFFFFF"
                        text="Seleccionar"
                        iconStyle={{ borderColor: "red" }}
                        textStyle={{ fontFamily: "JosefinSans-Regular" }}
                        onPress={() => {
                            checkedBook(item)
                        }}
                    />
                </Card.Content>
            </Card>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Ionicons onPress={() => confirmBooks()} name="checkmark-circle-outline" size={30} />
            
            <View>
              <Text>Lista de libros</Text>
            </View>
            <FlatList
                data={books}
                renderItem={renderItem}
                keyExtractor={item => item.isbn}
                onRefresh={loadBooks}
                refreshing={refreshing}
            />
        </SafeAreaView>
    )
}

export default SelectBooks;

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

import BouncyCheckbox from "react-native-bouncy-checkbox";
import React, {useContext, useState, useEffect} from 'react';
import { View, FlatList, Pressable, StyleSheet } from 'react-native';
import { Button, Card, Text, Title } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from "react-native-safe-area-context";

import { ApiContext } from '../context/ApiProvider';
import { NewItineraryContext } from "../context/NewItineraryProvider";

const SelectBooks = ({route, navigation}) => {
    const {getBooks} = useContext(ApiContext);

    const newItineraryContext = useContext(NewItineraryContext);
    const {books} = useContext(NewItineraryContext);

    const [booksList, setbookslist] = useState([]);
    const [selectedBooks, setselectedbooks] = useState([])
    const [refreshing, setrefreshing] = useState(false);

    const [editBooks, seteditbooks] = useState({});
    const [isEdit, setisedit] = useState(false); 


    const loadBooks = async () => {
        setrefreshing(true);
        try {
            const onEditBooks = route.params;
            console.log('books', onEditBooks);
            if (onEditBooks) {
                seteditbooks(onEditBooks)
                setselectedbooks(onEditBooks)
                setisedit(true)
            } else {
                console.log('books', books);
                setselectedbooks(books)
                setisedit(false)
            }


            const booksList = await getBooks();
            setbookslist(booksList);


        } catch (err) {
            console.log(err.response);  
        }
        setrefreshing(false);
    };

    useEffect(() => {
        loadBooks();
    }, []);

    const checkedBook = async (item) => {
        if (!selectedBooks.includes(item.isbn)) {
            selectedBooks.push(item.isbn)
            console.log('push', selectedBooks);
        } else {
            // let promises = []
            // promises = selectedBooks.filter((isbn) => isbn !== item.isbn);
            // const newBooks = await Promise.all(promises)
            const newBooks = selectedBooks.filter((isbn) => isbn !== item.isbn);
            // const index = selectedBooks.indexOf(item.id_user)
            // if (index > -1) {
            //     selectedBooks.splice(index, 1)
            //     console.log('new list', selectedBooks);
            // }
            console.log('new list', newBooks);
            setselectedbooks(newBooks)
        }

        console.log(selectedBooks);
    }

    const confirmBooks = () => {
        newItineraryContext.setBooks(selectedBooks)
        console.log('context books', books);
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
                        isChecked={isEdit ? editBooks.includes(item.isbn) : selectedBooks.includes(item.isbn)}
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
            <Button style={styles.button} mode="contained" onPress={() => confirmBooks()}>
                <Ionicons name="checkmark-circle-outline" size={20} /> Confirmar

            </Button>


            <FlatList
                data={booksList}
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
    },
    button: {
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 10,
        textAlignVertical: 'center'
    },
});

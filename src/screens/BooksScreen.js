import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import { View, StyleSheet, FlatList, Pressable } from 'react-native';
import { Text, Card, FAB, Title, Paragraph, Searchbar } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { ApiContext } from '../context/ApiProvider';
import { AuthContext } from '../context/AuthProvider';
import { ToastAndroid } from 'react-native';

const BooksScreen = ({ navigation }) => {
  const {getBooks, getBooksByUser, deleteBook} = useContext(ApiContext);
  const {authState} = useContext(AuthContext);

  const [books, setbooks] = useState([]);
  const [refreshing, setrefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const loadBooks = async () => {
      setrefreshing(true);
      try {
        const books = await getBooks();
        if (authState.user.role === 'alumno') {
          // console.log('prueba');
          const studentBooks = await getBooksByUser(authState.user.id_user);
          setbooks(studentBooks)
        } else {
          setbooks(books);
        }
      } catch (err) {
        console.log(err.response);
      }
      setrefreshing(false);
  };

  useEffect(() => {
    console.log('render');
    loadBooks();
  }, []);

  const onChangeSearch = query => {
      const filterBooks = [];
      books.forEach(book => {
        if (book.title.includes(query) || book.author.includes(query) || book.isbn.includes(query)) {
          filterBooks.push(book);
        }
      });
      console.log(filterBooks);
      console.log(query);
      if ((query == '')) {
        loadBooks();
      }
      if (filterBooks) {
        setbooks(filterBooks);
      } 
      setSearchQuery(query);
  };

  const goToDetails = (item) => {
      //console.log(item.name);
      navigation.navigate('Detalles libro', item);
  };

  const goToAdd = () => {
      navigation.navigate('Nuevo libro');
  }

  const goEdit = (item) => {
    console.log(item);
    navigation.navigate('Nuevo libro', item);
  }

  const handleDelete = async (item) => {
    try {
      const response = await deleteBook(item.isbn);
      console.log(response);
      loadBooks()
      ToastAndroid.show(response.msg, ToastAndroid.LONG)
    } catch (error) {
      ToastAndroid.show('Error al eliminar libro', ToastAndroid.LONG)
    }
      
  }

  const renderItem = ({item}) => {
      return (
        <Pressable onPress={() => goToDetails(item)}>
            <Card style={styles.item}>
                <Card.Title title={item.title} subtitle={`Autor: ${item.author}`} />
                {/* <Card.Cover style={styles.image} source={{ uri: item.image }} /> */}
                <Card.Content>
                  <Text>Isbn: {item.isbn}</Text>
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
              data={books}
              renderItem={renderItem}
              keyExtractor={item => item.isbn}
              onRefresh={loadBooks}
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

export default BooksScreen;

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

import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import { View, StyleSheet, FlatList, Pressable } from 'react-native';
import { Text, Card, FAB, Title, Paragraph } from 'react-native-paper';
import { ApiContext } from '../context/ApiProvider';
import { AuthContext } from '../context/AuthProvider';

const BooksScreen = ({ navigation }) => {
  const {getBooks, getBooksByUser} = useContext(ApiContext);
  const {authState} = useContext(AuthContext);

  const [books, setbooks] = useState([]);
  const [refreshing, setrefreshing] = useState(false);

  const loadBooks = async () => {
      setrefreshing(true);
      try {
        const books = await getBooks();
        if (authState.user.role === 'alumno') {
          console.log('prueba');
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
      loadBooks();
  }, []);

  const goToDetails = (item) => {
      //console.log(item.name);
      navigation.jumpTo('Detalles libro', item);
  };

  const goToAdd = () => {
      navigation.jumpTo('Nuevo libro');
  }

  const renderItem = ({item}) => {
      return (
        <Pressable onPress={() => goToDetails(item)}>
            <Card style={styles.item}>
                <Card.Title title={item.title} subtitle={`Autor: ${item.author}`} />
                {/* <Card.Cover style={styles.image} source={{ uri: item.image }} /> */}
                <Card.Content>
                    <Title></Title>
                    {/* <Paragraph>Itinerarios: {item.itinerary.length}</Paragraph> */}
                </Card.Content>
            </Card>
        </Pressable>
      );
  };
  return (
      <SafeAreaView style={styles.container}>
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
          <FAB style={styles.fab} small icon="plus" onPress={() => goToAdd()} />
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
});

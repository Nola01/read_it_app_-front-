
import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';

const DetailsScreen = ({route}) => {
  const item = route.params;

  return (
    <Card style={styles.item}>
      <Card.Title title={item.name} subtitle={`Departamento: ${item.department}`} />
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      <Card.Content>
        <Text style={styles.text}>Libros: {item.books.length}</Text>
        <Text style={styles.text}>{item.students[0].name}</Text>
      </Card.Content>
    </Card>
  );
};

export default DetailsScreen;

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
    }
  });

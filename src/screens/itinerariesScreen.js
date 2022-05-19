import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, Title, Paragraph } from 'react-native-paper';
import { ApiContext } from '../context/ApiProvider';


const ItinerariesScreen = () => {
    const {getItineraries} = useContext(ApiContext);

    const [itineraries, setitineraries] = useState([]);

    const loadItineraries = async () => {
        try {
          const itineraries = await getItineraries();
          // console.log(itineraries[0].name);
          setitineraries(itineraries);
        } catch (err) {
          console.log(err.response);
        }
    };

    useEffect(() => {
        loadItineraries();
    }, []);

    const renderItem = ({item}) => {
        return (
            <Card style={styles.item}>
                <Card.Title title={item.name} subtitle={`Departamento: ${item.department}`} />
                <Card.Content>
                    <Title></Title>
                    <Paragraph>Libros: {item.books.length}</Paragraph>
                </Card.Content>
            </Card>
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Lista de itinerarios</Text>
            </View>
            <FlatList
                data={itineraries}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
}

export default ItinerariesScreen;

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
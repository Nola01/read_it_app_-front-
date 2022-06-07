import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import { View, StyleSheet, FlatList, Pressable } from 'react-native';
import { Text, Card, Title, Paragraph } from 'react-native-paper';
import { ApiContext } from '../context/ApiProvider';


const ItinerariesScreen = ({navigation}) => {
    const {getItineraries} = useContext(ApiContext);

    const [itineraries, setitineraries] = useState([]);
    const [refreshing, setrefreshing] = useState(false);

    const loadItineraries = async () => {
        setrefreshing(true);
        try {
          const itineraries = await getItineraries();
          itineraries.map(itinerary => {
            console.log(itinerary.itinerary[0]);
          })
          // console.log(itineraries[0].name);
          setitineraries(itineraries);
        } catch (err) {
          console.log(err.response);
        }
        setrefreshing(false);
    };

    useEffect(() => {
        loadItineraries();
    }, []);

    const goToDetails = (item) => {
        //console.log(item.name);
        navigation.jumpTo('Detalles Itinerarios', item);
    };

    

    const renderItem = ({item}) => {
        return (
            <Pressable onPress={() => goToDetails(item)}>
                <Card style={styles.item}>
                    <Card.Title title={item.itinerary.name} subtitle={`Departamento: ${item.itinerary.department}`} />
                    <Card.Content>
                        <Title></Title>
                        {item.books ? 
                            <Paragraph>Libros: {item.books.length}</Paragraph>
                            :
                            <Paragraph>Libros: 0</Paragraph>
                        }
                    </Card.Content>
                </Card>
            </Pressable>
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
                onRefresh={loadItineraries}
                refreshing={refreshing}
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
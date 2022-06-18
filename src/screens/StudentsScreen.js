import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import { StyleSheet, FlatList, Pressable } from 'react-native';
import { Text, Card, Searchbar } from 'react-native-paper';

import { ApiContext } from '../context/ApiProvider';
import { ToastAndroid } from 'react-native';

const StudentsScreen = ({ navigation }) => {
  const {getStudents} = useContext(ApiContext);

  const [students, setStudents] = useState([]);
  const [refreshing, setrefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const loadStudents = async () => {
      setrefreshing(true);
      try {
        const students = await getStudents();
        setStudents(students)
      } catch (err) {
        ToastAndroid.show('Error al obtener lista de alumnos', ToastAndroid.LONG)
      }
      setrefreshing(false);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const onChangeSearch = query => {
    const filterStudents = [];
    students.forEach(student => {
      if (student.name.includes(query)) {
        filterStudents.push(student);
      }
    });
    console.log(filterStudents);
    console.log(query);
    if ((query == '')) {
      loadStudents();
    }
    if (filterStudents) {
      setStudents(filterStudents);
    } 
    setSearchQuery(query);
  };

  const renderItem = ({item}) => {
    return (
      <Pressable>
          <Card style={styles.item}>
              <Card.Title title={item.name} />
              <Card.Content>
                <Text>{item.email}</Text>
              </Card.Content>
              <Card.Actions style={styles.actions}>
                  
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
            data={students}
            renderItem={renderItem}
            keyExtractor={item => item.id_user}
            onRefresh={loadStudents}
            refreshing={refreshing}
        />
    </SafeAreaView>
);
}

export default StudentsScreen;

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
  actions: {
    margin: 10
  },
  icon: {
    fontSize: 30,
    marginRight: 40
  }
});

import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import { View, StyleSheet, FlatList, Pressable } from 'react-native';
import { Text, Card, FAB, Title, Paragraph } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { ApiContext } from '../context/ApiProvider';
import { AuthContext } from '../context/AuthProvider';
import { ToastAndroid } from 'react-native';

const StudentsScreen = ({ navigation }) => {
  const {getStudents} = useContext(ApiContext);
  const {authState} = useContext(AuthContext);

  const [students, setStudents] = useState([]);
  const [refreshing, setrefreshing] = useState(false);

  const loadStudents = async () => {
      setrefreshing(true);
      try {
        const students = await getStudents();
        setStudents(students)
      } catch (err) {
        console.log(err.response);
      }
      setrefreshing(false);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const renderItem = ({item}) => {
    return (
      <Pressable onPress={() => goToDetails(item)}>
          <Card style={styles.item}>
              <Card.Title title={item.name} />
              {/* <Card.Cover style={styles.image} source={{ uri: item.image }} /> */}
              <Card.Content>
                <Text>{item.email}</Text>
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

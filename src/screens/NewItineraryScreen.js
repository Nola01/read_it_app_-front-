import React, {useContext, useState} from 'react';
import {Image, Pressable, StyleSheet, ScrollView, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Card, TextInput, Button, Alert, Snackbar} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import * as RNFS from 'react-native-fs';

import { ApiContext } from '../context/ApiProvider';
import { AuthContext } from '../context/AuthProvider';


const NewItineraryScreen = ({navigation}) => {
    const authContext = useContext(AuthContext);
    const {authState} = useContext(AuthContext);
    const {getBooks, createBook, deleteBook} = useContext(ApiContext);


    const userId = authState.user.id_user


    const [name, setname] = useState('');
    const [department, setdepartment] = useState('');
    const [idTeacher, setidteacher] = useState(userId);
    const [endDate, setenddate] = useState('');

    const [response, setresponse] = useState({});
  
    const changeName = itineraryName => {
      setname(itineraryName);
    };
    const changeDepartment = department => {
      setdepartment(department);
      //console.log(category)
    };
    const changeEndDate = () => {
      
    };

    const selectBooks = () => {
        navigation.navigate('Seleccionar libros');
    }

  
    const handleAdd = () => {
      if (serieName == '') {
        alert('El nombre no puede estar vacío');
      } else {
        let newSerie = {};
        if (image == '') {
          newSerie = {
            name: serieName,
            category,
            platform,
            description,
            id_usuario: authContext.getUserId(),
          };
        } else {
          newSerie = {
            name: serieName,
            category,
            platform,
            description,
            image,
            id_usuario: authContext.getUserId(),
          };
        }
        //console.log(authContext.getUserId());
        //console.log(newSerie);
        createSerie(newSerie);
        navigation.navigate('Series');
      }
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <TextInput
            style={styles.input}
            label="Nombre"
            value={name}
            onChangeText={name => changeName(name)}
          />
          <TextInput
            style={styles.input}
            label="Departamento"
            value={department}
            onChangeText={department => changeDepartment(department)}
          />
          <TextInput
            style={styles.input}
            label="Profesor"
            disabled
            value={authState.user.name}
          />
          <Button onPress={() => selectBooks()} style={styles.save}>
              Seleccionar libros
          </Button>
          {/* <TextInput
            style={styles.input}
            label="Imagen (url)"
            value={image}
            onChangeText={image => changeImage(image)}
          /> */}
          <Button onPress={() => handleAdd()} style={styles.save}>
            Guardar
          </Button>
        </ScrollView>
      </SafeAreaView>
    );
}

export default NewItineraryScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      marginVertical: 10,
      marginHorizontal: 10,
    },
    input: {
      borderWidth: 1,
      marginVertical: 10,
      marginHorizontal: 10,
    },
    textArea: {
      height: 60,
    },
    title: {
      fontSize: 15,
      marginVertical: 10,
      marginHorizontal: 10,
    },
  });

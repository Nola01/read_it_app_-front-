import React, {useContext, useState, useEffect} from 'react';
import {Alert, Image, Pressable, StyleSheet, ScrollView, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Card, Dialog, TextInput, Button, Snackbar} from 'react-native-paper';
import CalendarPicker from 'react-native-calendar-picker';
import {Picker} from '@react-native-picker/picker';


import { AuthContext } from '../context/AuthProvider';
import { ApiContext } from '../context/ApiProvider';
import { NewItineraryContext } from '../context/NewItineraryProvider';


const NewItineraryScreen = ({navigation}) => {
  const authContext = useContext(AuthContext);
  const {authState} = useContext(AuthContext);
  const newItineraryContext = useContext(NewItineraryContext);

  const {createItinerary, getGroups} = useContext(ApiContext);


  const {nameState} = useContext(NewItineraryContext);
  const {departmentState} = useContext(NewItineraryContext);
  const {groupState} = useContext(NewItineraryContext);
  const {endDateState} = useContext(NewItineraryContext);
  const {booksState} = useContext(NewItineraryContext);
  const {studentsState} = useContext(NewItineraryContext);


  const [groups, setgroups] = useState();
  const [visible, setvisible] = useState(false);


  const loadGroups = async () => {
    try {
      const groups = await getGroups();
      setgroups(groups);
      setvisible(true)
    } catch (err) {
      console.log(err.response);
    }
  };
  
  useEffect(() => {
    loadGroups();
  }, []);


  const changeName = itineraryName => {
    newItineraryContext.setNameState(itineraryName)
    console.log(nameState);
  };
  const changeDepartment = department => {
    newItineraryContext.setDepartmentState(department)
    console.log(departmentState);
  };
  const changeGroup = department => {
    newItineraryContext.setGroupState(department)
    console.log(departmentState);
  };
  const changeEndDate = (date) => {
    newItineraryContext.setEndDateState(getDate(date)[1])
    console.log('endate', endDateState);
  };

  const getDate = (dateWithTime) => {
    // date = response.data.itinerary.endDate;
    let date = new Date(dateWithTime)
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let dt = date.getDate();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }

    const newDate1 = dt +'-' + month + '-' + year;
    const newDate2 = year +'-' + month + '-' + dt;
    return [newDate1, newDate2];
}

  const selectBooks = () => {
      navigation.navigate('Seleccionar libros');
  }

  const selectStudents = () => {
    navigation.navigate('Seleccionar alumnos')
  }


  const handleAdd = async () => {
    let newItinerary = {
      name: nameState,
      department: departmentState,
      id_teacher: authState.user.id_user,
      id_group: 1,
      endDate: endDateState,
      books: booksState,
      students: studentsState
    };

    console.log('new', newItinerary);

    const response = await createItinerary(newItinerary);
    if (response.ok === false) {
      console.log(response.msg);
    } else {
      console.log(response.msg);
      
    }

    navigation.navigate('Itinerarios');
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TextInput
          style={styles.input}
          label="Nombre"
          value={nameState}
          onChangeText={name => changeName(name)}
        />
        <TextInput
          style={styles.input}
          label="Departamento"
          value={departmentState}
          onChangeText={department => changeDepartment(department)}
        />
        {visible ? 
          <Picker
            selectedValue={groupState}
            onValueChange={itemValue => newItineraryContext.setGroupsState(itemValue)}>
            {groups.map(group => {
              <Picker.Item label={group.name} value={group.id_group} />
            })}
            
          
          </Picker>
          :
          <Picker></Picker>
        }
        <TextInput
          style={styles.input}
          label="Fecha final"
          disabled
          value={getDate(endDateState)[0]}
        />
        
        <CalendarPicker
            selectedDayColor="#66ff33"
            previousTitle="Anterior"
            nextTitle="Siguiente"
            minDate={new Date()}
            weekdays={['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']}
            months={['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']}
            onDateChange={changeEndDate}
        />

        <TextInput
          style={styles.input}
          label="Profesor"
          disabled
          value={authState.user.name}
        />
        <TextInput
          style={styles.input}
          label="Libros"
          disabled
          value={booksState.length.toString()}
        />
        <Button style={styles.button} mode="contained" onPress={() => selectBooks()}>
            Seleccionar libros
        </Button>
        
        <TextInput
          style={styles.input}
          label="Alumnos"
          disabled
          value={studentsState.length.toString()}
        />
        <Button style={styles.button} mode="contained" onPress={() => selectStudents()}>
            Seleccionar alumnos
        </Button>

        <Button mode="contained" onPress={() => handleAdd()}>
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
    button: {
      marginTop: 10,
      marginBottom: 10
    }
  });

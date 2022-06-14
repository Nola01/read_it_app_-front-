import React, {useContext, useState, useEffect} from 'react';
import {Alert, Image, Pressable, StyleSheet, ScrollView, Text, View, ToastAndroid} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Card, Dialog, TextInput, Button, Snackbar} from 'react-native-paper';
import CalendarPicker from 'react-native-calendar-picker';
import {Picker} from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';



import { AuthContext } from '../context/AuthProvider';
import { ApiContext } from '../context/ApiProvider';
import { NewItineraryContext } from '../context/NewItineraryProvider';

const timeToString = (dateWithTime) => {
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


const NewItineraryScreen = ({navigation}) => {
  const authContext = useContext(AuthContext);
  const {authState} = useContext(AuthContext);
  const newItineraryContext = useContext(NewItineraryContext);

  const {createItinerary, getUserGroups} = useContext(ApiContext);


  const {name} = useContext(NewItineraryContext);
  const {department} = useContext(NewItineraryContext);
  const {group} = useContext(NewItineraryContext);
  const {endDate} = useContext(NewItineraryContext);
  const {books} = useContext(NewItineraryContext);
  const {students} = useContext(NewItineraryContext);


  const [groupsList, setgroupsList] = useState([]);
  const [visibleDate, setvisibledate] = useState(false);
  const [visibleGroup, setvisibleGroup] = useState(false);


  const loadGroups = async () => {
    try {
      const groups = await getUserGroups(authState.user.id_user);
      setgroupsList(groups);
      console.log('grupos', groups);
      //setvisible(true)
    } catch (err) {
      console.log(err.response);
    }
  };
  
  useEffect(() => {
    loadGroups();
  }, []);


  const changeName = itineraryName => {
    newItineraryContext.setName(itineraryName)
    console.log(name);
  };
  const changeDepartment = department => {
    newItineraryContext.setDepartment(department)
    console.log(department);
  };
  const changeGroup = group => {
    newItineraryContext.setGroup(group)
    console.log(group);
  };
  const changeEndDate = (date) => {
    newItineraryContext.setEndDate(timeToString(date)[1])
    console.log('endate', endDate);
  };

  const selectBooks = () => {
      navigation.navigate('Seleccionar libros');
  }

  const selectStudents = () => {
    navigation.navigate('Seleccionar alumnos')
  }


  const handleAdd = async () => {
    let newItinerary = {
      name,
      department,
      id_teacher: authState.user.id_user,
      id_group: 1,
      endDate,
      books,
      students
    };

    console.log('new', newItinerary);

    

    const response = await createItinerary(newItinerary);
    
    ToastAndroid.show(response.msg, ToastAndroid.LONG)

    newItineraryContext.setName('')
    newItineraryContext.setDepartment('')
    newItineraryContext.setGroup('')
    newItineraryContext.setEndDate('')
    newItineraryContext.setBooks([])
    newItineraryContext.setStudents([])

    navigation.navigate('Itinerarios');
    
  }

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

        <View style={styles.selectInput}>
          <TextInput
            style={styles.input}
            label="Grupo"
            disabled
            value={group}
          />
          <Ionicons style={styles.selectIcon} name="caret-down" size={50} onPress={() => setvisibleGroup(!visibleGroup)}/>
        </View>
        
        {visibleGroup ?
          <Picker
            selectedValue={group}
            onValueChange={itemValue => newItineraryContext.setGroup(itemValue)}>
            {groupsList !== undefined ?
              groupsList.map(group => {
                <Picker.Item label={group.name} value={group.id_group} />
              })
              :
              null
            }
          </Picker>
          :
          <></>
        }

        <View style={styles.selectInput}>
          <TextInput
            style={styles.input}
            label="Fecha final"
            disabled
            value={timeToString(endDate)[0]}
          />
          <Ionicons style={styles.selectIcon} name="caret-down" size={50} onPress={() => setvisibledate(!visibleDate)}/>
        </View>
      
        
        {visibleDate ? 
          <CalendarPicker
            selectedDayColor="#66ff33"
            previousTitle="Anterior"
            nextTitle="Siguiente"
            minDate={new Date()}
            weekdays={['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']}
            months={['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']}
            onDateChange={changeEndDate}
          />
          :
          <></>
        }

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
          value={books.length.toString()}
        />
        <Button style={styles.button} mode="contained" onPress={() => selectBooks()}>
            Seleccionar libros
        </Button>
        
        <TextInput
          style={styles.input}
          label="Alumnos"
          disabled
          value={students.length.toString()}
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
      borderRadius: 10,
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
      marginBottom: 10,
      textAlignVertical: 'center'
    },
    selectInput: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly'
    },
    selectIcon: {
      marginTop: 15
    }
  });

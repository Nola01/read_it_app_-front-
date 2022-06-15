import React, {useContext, useState, useEffect} from 'react';
import {Alert, Image, Pressable, StyleSheet, ScrollView, Text, View, ToastAndroid} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Card, Dialog, Divider, TextInput, Button, Snackbar} from 'react-native-paper';
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


const NewItineraryScreen = ({route, navigation}) => {

  const authContext = useContext(AuthContext);
  const {authState} = useContext(AuthContext);
  const newItineraryContext = useContext(NewItineraryContext);

  const {createItinerary, getUserGroups, updateItinerary} = useContext(ApiContext);


  const {name} = useContext(NewItineraryContext);
  const {department} = useContext(NewItineraryContext);
  const {group} = useContext(NewItineraryContext);
  const {endDate} = useContext(NewItineraryContext);
  const {books} = useContext(NewItineraryContext);
  const {students} = useContext(NewItineraryContext);

  const [item, setitem] = useState({});

  const [groupsList, setgroupsList] = useState([]);
  const [visibleDate, setvisibledate] = useState(false);
  const [visibleGroup, setvisibleGroup] = useState(false);
  const [isEdit, setisedit] = useState(false); 

  const BackButtonListener = () => {
    // const [pressed, serpressed] = useState(false)
    useEffect(() => {
      window.onpopstate = () => {
        console.log('atrás');
        setitem({})
      }
    })
  }


  const loadGroups = async () => {
    try {

      const item = route.params;
      console.log('item', item);
      if (item) {
        console.log('editar');
        newItineraryContext.setName(item.itinerary.name)
        newItineraryContext.setDepartment(item.itinerary.department)
        newItineraryContext.setGroup(item.itinerary.id_group)
        newItineraryContext.setEndDate(item.itinerary.endDate)
        newItineraryContext.setBooks(item.books)
        newItineraryContext.setStudents(item.students)

        setitem(item)
        setisedit(true)
      } else {
        console.log('crear');
        newItineraryContext.setName('')
        newItineraryContext.setDepartment('')
        newItineraryContext.setGroup('')
        newItineraryContext.setEndDate('')
        newItineraryContext.setBooks([])
        newItineraryContext.setStudents([])
      }
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

  const selectBooks = (books) => {
      const isbnList = []
      if (books != undefined) {
        books.map(book => isbnList.push(book.isbn))
      }
      navigation.navigate('Seleccionar libros', isbnList);
  }

  const selectStudents = (students) => {
    navigation.navigate('Seleccionar alumnos', students)
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

    let response;

    if (isEdit) {
      response = await updateItinerary(newItinerary, item.itinerary.id_itinerary)
    } else {
      response = await createItinerary(newItinerary);
    }
    
    ToastAndroid.show(response.msg, ToastAndroid.LONG)

    newItineraryContext.setName('')
    newItineraryContext.setDepartment('')
    newItineraryContext.setGroup('')
    newItineraryContext.setEndDate('')
    newItineraryContext.setBooks([])
    newItineraryContext.setStudents([])

    setitem({})

    navigation.navigate('Itinerarios');
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TextInput
          mode='outlined'
          style={styles.input}
          label="Nombre"
          value={name}
          onChangeText={name => changeName(name)}
        />
        <TextInput
          mode='outlined'
          style={styles.input}
          label="Departamento"
          value={department}
          onChangeText={department => changeDepartment(department)}
        />

        <View style={styles.selectInput}>
          <TextInput
            mode='outlined'
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
            mode='outlined'
            style={styles.input}
            label="Fecha final"
            disabled
            value={timeToString(endDate)[0]}
          />
          {visibleDate ?
            <Ionicons style={styles.selectIcon} name="caret-up-circle-outline" size={50} onPress={() => setvisibledate(!visibleDate)}/>
            :
            <Ionicons style={styles.selectIcon} name="caret-down-circle-outline" size={50} onPress={() => setvisibledate(!visibleDate)}/>
          }
          
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
          mode='outlined'
          style={styles.input}
          label="Profesor"
          disabled
          value={authState.user.name}
        />
        <TextInput
          mode='outlined'
          style={styles.input}
          label="Libros"
          disabled
          value={books ? books.length.toString() : 0}
        />
        <Button style={styles.button} mode="contained" onPress={() => selectBooks(item.books)}>
            Seleccionar libros
        </Button>
        
        <TextInput
          mode='outlined'
          style={styles.input}
          label="Alumnos"
          disabled
          value={students ? students.length.toString() : 0}
        />
        <Button style={styles.button} mode="contained" onPress={() => selectStudents(item.students)}>
            Seleccionar alumnos
        </Button>

        <Divider style={styles.divider}/>

        <Button style={styles.button} mode="contained" onPress={() => handleAdd()}>
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
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderRadius: 20,
      marginVertical: 10,
      marginHorizontal: 10,
    },
    button: {
      borderRadius: 20,
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
    },
    divider: {
      
    }
  });

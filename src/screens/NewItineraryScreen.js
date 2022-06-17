import React, {useContext, useState, useEffect} from 'react';
import { StyleSheet, ScrollView, Text, View, ToastAndroid} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Divider, TextInput, Button} from 'react-native-paper';
import CalendarPicker from 'react-native-calendar-picker';
import {Picker} from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';


import { AuthContext } from '../context/AuthProvider';
import { ApiContext } from '../context/ApiProvider';
import { NewItineraryContext } from '../context/NewItineraryProvider';

const timeToString = (dateWithTime) => {
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

  const {authState} = useContext(AuthContext);
  const newItineraryContext = useContext(NewItineraryContext);

  const {createItinerary, getUserGroups, updateItinerary} = useContext(ApiContext);


  const {name} = useContext(NewItineraryContext);
  const {department} = useContext(NewItineraryContext);
  const {group} = useContext(NewItineraryContext);
  const {endDate} = useContext(NewItineraryContext);
  const {books} = useContext(NewItineraryContext);
  const {students} = useContext(NewItineraryContext);

  const [editItem, setEditItem] = useState({});

  const [groupsList, setgroupsList] = useState([]);

  const [visibleDate, setvisibledate] = useState(false);
  const [isEdit, setisedit] = useState(false);

  const [nameError, setNameError] = useState(false); 
  const [departmentError, setDepartmentError] = useState(false); 
  const [dateError, setDateError] = useState(false); 
  const [booksError, setBooksError] = useState(false);
  const [studentsError, setStudentsError] = useState(false); 

  const [error, setError] = useState(true)
  const [isFirstTouchBooks, setFirstTouchBooks] = useState(true)
  const [isFirstTouchStudents, setFirstTouchStudents] = useState(true)

  const loadGroups = async () => {
    try {

      const item = route.params;
      if (item) {
        console.log('editar');
        newItineraryContext.setName(item.itinerary.name)
        newItineraryContext.setDepartment(item.itinerary.department)
        newItineraryContext.setGroup(item.itinerary.id_group)
        newItineraryContext.setEndDate(item.itinerary.endDate)
        newItineraryContext.setBooks(item.books)
        newItineraryContext.setStudents(item.students)

        console.log(name, department);

        setEditItem(item)
        setisedit(true)
        setError(false)
        setNameError(false)
        setDepartmentError(false)
        setDateError(false)
      } else {
        // setEditItem({})
        console.log('crear');
        newItineraryContext.setName('')
        newItineraryContext.setDepartment('')
        newItineraryContext.setGroup('')
        newItineraryContext.setEndDate('')
        newItineraryContext.setBooks([])
        newItineraryContext.setStudents([])
        setisedit(false)
        
      }
      const groups = await getUserGroups(authState.user.id_user);
      setgroupsList(groups);
      console.log('grupos', groups);
    } catch (err) {
      ToastAndroid.show('Error al setear formulario', ToastAndroid.LONG)
    }
  };
  
  useEffect(() => {
    loadGroups();
  }, []);


  const changeName = itineraryName => {
    if (itineraryName === '') {
      setNameError(true)
      setError(true)
    } else {
      setNameError(false)
      setError(false)
    }
    newItineraryContext.setName(itineraryName)
  };

  const changeDepartment = department => {
    if (department === '') {
      setDepartmentError(true)
      setError(true)
    } else {
      setDepartmentError(false)
      setError(false)
    }
    newItineraryContext.setDepartment(department)
  };

  const changeGroup = group => {
    newItineraryContext.setGroup(group)
    console.log('group', group);
  };

  const changeEndDate = (date) => {
    if (date === 'NaN-NaN-NaN') {
      setDateError(true)
      setError(true)
    } else {
      setDateError(false)
      setError(false)
    }
    newItineraryContext.setEndDate(timeToString(date)[1])
  };

  const selectBooks = () => {   
    console.log(isFirstTouchBooks);
    if (isFirstTouchBooks) {
      const isbnList = []
      if (Object.keys(editItem).length !== 0) {
        console.log(editItem);
        editItem.books.map(book => isbnList.push(book.isbn))
        setFirstTouchBooks(false)
        navigation.navigate('Seleccionar libros', isbnList);
      } else {
        setFirstTouchBooks(false)
        navigation.navigate('Seleccionar libros');
      }
      
    } else {
      setFirstTouchBooks(false)
      navigation.navigate('Seleccionar libros');
    }
    
  }

  const selectStudents = () => {
    console.log(isFirstTouchStudents);
    if (isFirstTouchStudents) {
      const studentsList = []
      if (Object.keys(editItem).length !== 0) {
        console.log('edit',editItem);
        editItem.students.map(student => studentsList.push(student.id_user))
        setFirstTouchStudents(false)
        console.log(studentsList);
        navigation.navigate('Seleccionar alumnos', studentsList)
      } else {
        setFirstTouchStudents(false)
        navigation.navigate('Seleccionar alumnos');
      }
      
    } else {
      setFirstTouchStudents(false)
      navigation.navigate('Seleccionar alumnos');
    }
    
  }


  const handleAdd = async () => {
    try {
      let newItinerary = {
        name,
        department,
        id_teacher: authState.user.id_user,
        id_group: 1,
        endDate,
        books ,
        students
      };

  
      console.log('new', newItinerary);
  
      let response;

      if (isEdit) {
        console.log('id', editItem.itinerary.id_itinerary);
        response = await updateItinerary(newItinerary, editItem.itinerary.id_itinerary)
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
  
      
  
      navigation.navigate('Itinerarios');
    } catch (error) {
      ToastAndroid.show('Error al crear itinerario', ToastAndroid.LONG)
    }
    
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
        {nameError ? <Text style={styles.error}>El nombre es obligatorio</Text> : <></>}

        <TextInput
          mode='outlined'
          style={styles.input}
          label="Departamento"
          value={department}
          onChangeText={department => changeDepartment(department)}

        />
        {departmentError ? <Text style={styles.error}>El departamento es obligatorio</Text> : <></>}

        {/* <View style={styles.selectInput}>
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
        </View> */}
        
        <View style={styles.selectInput}>
          <TextInput
            mode='outlined'
            style={styles.dateInput}
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

        {dateError ? <Text style={styles.error}>La fecha de finalización es obligatoria</Text> : <></>}

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
          value={books.length.toString()}
        />
        {booksError ? <Text style={styles.error}>Debe seleccionar al menos un libro</Text> : <></>}

        <Button style={styles.button} mode="contained" onPress={() => selectBooks()}>
            Seleccionar libros
        </Button>
        
        <TextInput
          mode='outlined'
          style={styles.input}
          label="Alumnos"
          disabled
          value={students.length.toString()}
        />
        {studentsError ? <Text style={styles.error}>Debe seleccionar al menos un alumno</Text> : <></>}

        <Button style={styles.button} mode="contained" onPress={() => selectStudents()}>
            Seleccionar alumnos
        </Button>

        <Divider style={styles.divider}/>

        <Button style={styles.button} disabled={error} mode="contained" onPress={() => handleAdd()}>
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
    dateInput: {
      width: 310
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
    error: {
      color: '#E63117'
    },  
    divider: {
      
    }
  });

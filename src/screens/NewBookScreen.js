import React, {useContext, useState, useEffect} from 'react';
import {Image, StyleSheet, ScrollView, Text, ToastAndroid} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextInput, Button} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/AntDesign';

import { ApiContext } from '../context/ApiProvider';
import { AuthContext } from '../context/AuthProvider';


const NewBookScreen = ({route, navigation}) => {
    const {createBook, updateBook} = useContext(ApiContext);

    const [editItem, setEditItem] = useState({});

    const [isbn, setisbn] = useState('');
    const [title, settitle] = useState('');
    const [author, setauthor] = useState('');
    const [image, setimage] = useState('');

    const [isbnError, setIsbnError] = useState(false); 
    const [titleError, setTitleError] = useState(false); 
    const [authorError, setAuthorError] = useState(false); 
    const [imageError, setImageError] = useState(false);
    const [studentsError, setStudentsError] = useState(false); 

    const [error, setError] = useState(true);
    const [isEdit, setisedit] = useState(false);

    const loadItem = async () => {
        try {
            const item = route.params;
            if (item) {
                console.log('editar');
                setisbn(item.isbn)
                settitle(item.title)
                setauthor(item.author)
                setimage(item.image)

                setEditItem(item)
                setisedit(true)
            } else {
            // setEditItem({})
                console.log('crear');
                setisbn('')
                settitle('')
                setauthor('')
                setimage('')
            }
        } catch (err) {
            console.log(err.response);
        }
    };

    useEffect(() => {
        loadItem();
    }, []);

    const setForm = () => {
        setisbn('');
        settitle('');
        setauthor('');
        setimage('https://via.placeholder.com/400');
    }

    const changeIsbn = isbn => {
        if (isbn === '') {
            setIsbnError(true)
            setError(true)
        } else {
            setIsbnError(false)
            setError(false)
        }
        setisbn(isbn);
    };

    const changeTitle = bookTitle => {
        if (bookTitle === '') {
            setTitleError(true)
            setError(true)
        } else {
            setTitleError(false)
            setError(false)
        }
        settitle(bookTitle);
    };

    const changeAuthor = author => {
        if (author === '') {
            setAuthorError(true)
            setError(true)
        } else {
            setAuthorError(false)
            setError(false)
        }
        setauthor(author);
    };

    const changeImage = image => {
        setimage(image)
    };

    const selectImage = () => {
        const options = {
            title: "Selecciona una imagen",
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }

        launchImageLibrary(options, (response) => {
            if (response.errorCode) {
                console.log(response.errorCode);
            } else if (response.didCancel) {
                console.log('El usuario canceló la selección');
            } else {
                const uri = response.assets[0].uri
                setimage(uri)
            }
        })
    };

    const takePicture = () => {
        const options = {
            title: "Hacer foto",
            storageOptions: {
                skipBackup: true,
                path: 'images'
            },
            forceJpg: true,
            includeBase64: true
        }

        launchCamera(options, (response) => {
            if (response.errorCode) {
                console.log(response.errorCode);
            } else if (response.didCancel) {
                console.log('El usuario canceló la selección');
            } else {
                const uri = response.assets[0].uri
                console.log(uri);
                setimage(uri)
            }
        })
        
    }

    const handleAdd = async () => {
        try {
            let newBook = {
                isbn: isbn || editItem.isbn,
                title: title || editItem.title,
                author: author || editItem.author,
                image: image || editItem.image
            };

            let response;

            if (isEdit) {
                response = await updateBook(newBook, editItem.isbn)
            } else {
                response = await createBook(newBook);
            }
           
            ToastAndroid.show(response.msg, ToastAndroid.LONG)
    
            setForm()

            navigation.navigate('Libros');
        } catch (error) {
            ToastAndroid.show('Error al crear libros', ToastAndroid.LONG)
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <TextInput
                    mode='outlined'
                    style={styles.input}
                    disabled={isEdit}
                    label="Isbn"
                    value={isbn}
                    onChangeText={isbn => changeIsbn(isbn)}
                />
                {isbnError ? <Text style={styles.error}>El isbn es obligatorio</Text> : <></>}

                <TextInput
                    mode='outlined'
                    style={styles.input}
                    label="Título"
                    value={title}
                    onChangeText={bookTitle => changeTitle(bookTitle)}
                />
                {titleError ? <Text style={styles.error}>El título es obligatorio</Text> : <></>}

                <TextInput
                    mode='outlined'
                    style={styles.input}
                    label="Autor"
                    value={author}
                    onChangeText={author => changeAuthor(author)}
                />
                {authorError ? <Text style={styles.error}>El autor es obligatorio</Text> : <></>}

                <TextInput
                    mode='outlined'
                    style={styles.input}
                    label="Imagen (url)"
                    value={image}
                    onChangeText={image => changeImage(image)}
                />

                <Button onPress={() => selectImage()} mode="contained" style={styles.button}>
                    <Icons name="picture" size={18} /> Seleccionar imagen
                </Button>

                <Button onPress={() => takePicture()} mode="contained" style={styles.button}>
                    <Ionicons name="camera-outline" size={18} />  Hacer una foto
                </Button>
            
                <Image 
                    style={styles.image}
                    source={{uri: image}}>
                </Image>

                <Button onPress={() => handleAdd()} disabled={error} mode="contained" style={styles.button}>
                    <Ionicons name="save-outline" size={18} /> Guardar
                </Button>
            </ScrollView>
        </SafeAreaView>
    );  
}

export default NewBookScreen;

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
    image: {
        alignSelf: 'center',
        height: 400,
        width: 300
    },
    error: {
        color: '#E63117'
    },    
  });

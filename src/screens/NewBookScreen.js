import React, {useContext, useState, useEffect} from 'react';
import {Image, Pressable, StyleSheet, ScrollView, Text, ToastAndroid} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Card, TextInput, Button, Alert, Snackbar} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import * as RNFS from 'react-native-fs';

import { ApiContext } from '../context/ApiProvider';
import { AuthContext } from '../context/AuthProvider';


const NewBookScreen = ({navigation}) => {
    const authContext = useContext(AuthContext);
    const {getBooks, createBook, deleteBook} = useContext(ApiContext);

    const [isbn, setisbn] = useState('');
    const [title, settitle] = useState('');
    const [author, setauthor] = useState('');
    const [image, setimage] = useState('https://via.placeholder.com/400');

    const [isbnError, setIsbnError] = useState(false); 
    const [titleError, setTitleError] = useState(false); 
    const [authorError, setAuthorError] = useState(false); 
    const [imageError, setImageError] = useState(false);
    const [studentsError, setStudentsError] = useState(false); 

    const [error, setError] = useState(true)

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
                console.log(uri);
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
                // var Base64Code = base64Image.split("data:image/png;base64,"); //base64Image is my image base64 string

                const uri = response.assets[0].uri

                // var path = RNFS.DocumentDirectoryPath + `/${new Date().toISOString()}/${isbn}.jpg`.replace(/:/g, '-');

                const imagePath = `${RNFS.DocumentDirectoryPath}/${new Date().toISOString()}/${isbn}.jpg`.replace(/:/g, '-');

                // write the file
                // RNFS.writeFile(imagePath, uri)
                // .then((success) => {
                // console.log('FILE WRITTEN!');
                // })
                // .catch((err) => {
                // console.log(err.message);
                // });
                
                // const imagePath = `${RNFS.DocumentDirectoryPath}/${new Date().toISOString()}.jpg`.replace(/:/g, '-');

                // RNFS.copyFile(uri, imagePath)
                // .then(res => {console.log('ok', res);})
                // .catch(err => {
                //     console.log('ERROR: image file write failed!!!');
                //     console.log(err.message, err.code);
                // });

                console.log(uri);
                setimage(uri)
                // const strings = uri.split('.jpg')
                // const addIsbn = strings[0].concat('/isbn/', isbn)
                // const newUri = addIsbn.concat('.jpg')
                // console.log('nueva uri', newUri);
                // setimage(newUri)

                
            }
        })
        
    }

    const handleAdd = async () => {
        try {
            let newBook = {
                isbn,
                title,
                author,
                image
            };
    
            const response = await createBook(newBook);
            console.log('respuesta', response);
           
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

                <Button onPress={() => selectImage()} mode="contained" style={styles.button}>
                    Seleccionar imagen
                </Button>

                <Button onPress={() => takePicture()} mode="contained" style={styles.button}>
                    Hacer una foto
                </Button>
            
                <Image 
                    style={styles.image}
                    source={{uri: image}}>
                </Image>

                <Button onPress={() => handleAdd()} disabled={error} mode="contained" style={styles.button}>
                    Guardar
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
    title: {
        fontSize: 15,
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

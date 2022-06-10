import React, {useContext, useState} from 'react';
import {Image, Pressable, StyleSheet, ScrollView, Text} from 'react-native';
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

    const [response, setresponse] = useState({});



    const changeIsbn = isbn => {
        setisbn(isbn);
        };

    const changeTitle = bookTitle => {
        settitle(bookTitle);
    };

    const changeAuthor = author => {
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
        if (title == '') {
            alert('El nombre no puede estar vacío');
        } else {
            let newBook = {
                isbn,
                title,
                author,
                image
            };

            const response = await createBook(newBook);
            console.log('respuesta', response);
            // if (response.ok === 'false') {
            //     setresponse(response.msg)
            //     setvisible(true)
            // }

            if (response.ok === 'false') {
                setresponse(response.msg)
                //setvisible(true)
            }
            
            navigation.navigate('Libros');
        }
    };

    const undoCreate = async () => {
        const response = await deleteBook(isbn)
        setresponse(response.msg)
        setvisible(true)
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <TextInput
                style={styles.input}
                label="Isbn"
                value={isbn}
                onChangeText={bookIsbn => changeIsbn(bookIsbn)}
                />
                <TextInput
                style={styles.input}
                label="Título"
                value={title}
                onChangeText={bookTitle => changeTitle(bookTitle)}
                />
                <TextInput
                style={styles.input}
                label="Autor"
                value={author}
                onChangeText={author => changeAuthor(author)}
                />

                <Button onPress={() => selectImage()}>
                    Seleccionar imagen
                </Button>

                <Button onPress={() => takePicture()}>
                    Hacer una foto
                </Button>
            
                <Image 
                    style={styles.image}
                    source={{uri: image}}>
                </Image>

                <Button onPress={() => handleAdd()} style={styles.save}>
                    Guardar
                </Button>
                {/* <Snackbar
                    duration={5000}
                    visible={visible}
                    onDismiss={onDismissSnackBar}
                    action={{
                        label: 'Undo',
                        onPress: () => undoCreate(),
                    }}>
                    {response}
                </Snackbar> */}
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
    image: {
        alignSelf: 'center',
        height: 400,
        width: 300
    }
  });

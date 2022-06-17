import React, {useState, useContext} from 'react';
import {
  Keyboard,
  Pressable,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { ActivityIndicator, HelperText } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import { ApiContext } from '../context/ApiProvider';
import Container from '../components/Container';

const RegisterScreen = ({navigation}) => {
  const {register} = useContext(ApiContext);

  const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState(undefined);
  const [role, setRole] = useState(undefined);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [loading, setLoading] = useState(false);

  const validateFields = () => {
    if (name === '') {
      setAuthError('El nombre está vacío')
    } else if (email === '') {
      setAuthError('El email está vacío')
    } else if (!emailRegex.test(email)) {
      setAuthError('El email no es correcto')
    } else if (password === '') {
      setAuthError('La contraseña está vacía')
    } else if (password.length < 8) {
      setAuthError('La contraseña debe tener como mínimo 8 caracteres')
    } else if (password.length > 16) {
      setAuthError('La contraseña no puede tener más de 16 caracteres')
    } 
    // else {
    //   setAuthError('Contraseña incorrecta')
    // }
  }

  const onRegister = async () => {
    setLoading(true)
    validateFields()
    let response;
    try {
      response = await register(name, email.trim(), password, pin, role);
    } catch (err) {
      console.log(err);
      setAuthError(err);
      console.log(response);
      ToastAndroid.show(response.msg, ToastAndroid.LONG)
    }
    setLoading(false)
  };

  return (
    <Container>
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.center}>
              <Text style={styles.title}>Read it!</Text>
              <ScrollView style={styles.form}>
                  <TextInput
                    style={styles.input}
                    placeholder="Nombre completo"
                    placeholderTextColor="#ccc"
                    autoCapitalize="none"
                    onChangeText={text => setName(text)}
                    value={name}
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#ccc"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={text => setEmail(text)}
                    value={email}
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor="#ccc"
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText={text => setPassword(text)}
                    value={password}
                  />

                  <HelperText
                    style={styles.error}
                    type="error"
                    visible={authError !== '' && authError !== null}>
                    {authError}
                  </HelperText>

                  <Pressable style={styles.button} onPress={onRegister}>
                  {!loading ?
                    <Text style={styles.buttonText}>Registrarse</Text>
                    :
                    <ActivityIndicator size="small" color="#0000ff" />
                  }
                  </Pressable>

                  <Pressable style={styles.button} onPress={() => navigation.navigate('Login')}>
                      <Text style={styles.buttonText}>¿Tienes una cuenta? Inicia sesión</Text>
                  </Pressable>

                  <View style={styles.copyright}>
                    <Text style={styles.subtitle}>
                      <Icon name="copyright" size={15} color="#fff" /> Copyright 2022 - Juan María Nolasco
                    </Text>
                  </View>
              </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  center: {
    flex: 1,
    marginHorizontal: 30,
    marginVertical: 30,
    alignItems: 'center',
  },
  title: {
    marginTop: 50,
    fontSize: 30,
    fontWeight: '600',
    fontFamily: 'Macondo-Regular',
    color: 'white',
  },
  form: {
    marginTop: 20,
    padding: 0,
    alignSelf: 'stretch',
  },
  input: {
    fontSize: 20,
    alignSelf: 'stretch',
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 4,
    borderColor: 'white',
    borderWidth: 1,
    marginTop: 20,
  },
  error: {
    flex: 1,
    textAlign: 'center',
    marginTop: 10,
    color: 'white',
    fontSize: 16,
  },
  button: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    width: '100%',
    backgroundColor: '#fff',
  },
  copyright: {
    paddingVertical: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexGrow: 1,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#054b93',
  },
  subtitle: {
    marginTop: 10,
    color: 'white',
    fontSize: 14,
  },
});

export default RegisterScreen;
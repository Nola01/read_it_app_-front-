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
import { HelperText } from 'react-native-paper';

import { ApiContext } from '../context/ApiProvider';
import Container from '../components/Container';

const RegisterScreen = ({navigation}) => {
  const {register} = useContext(ApiContext);

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const onRegister = async () => {
    try {
      await register(name, surname, email.trim(), password);
    } catch (err) {
      console.log(err);
      setAuthError(err);
    }
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
                  placeholder="Nombre"
                  placeholderTextColor="#ccc"
                  keyboardType="name"
                  autoCapitalize="none"
                  onChangeText={text => setName(text)}
                  value={name}
                  />
                  <TextInput
                  style={styles.input}
                  placeholder="Apellido"
                  placeholderTextColor="#ccc"
                  keyboardType="surname"
                  autoCapitalize="none"
                  onChangeText={text => setSurname(text)}
                  value={surname}
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
                  El usuario ya está registrado
                  </HelperText>
                  <Pressable style={styles.button} onPress={onRegister}>
                      <Text style={styles.buttonText}>Registrarse</Text>
                  </Pressable>
                  <Pressable style={styles.button} onPress={() => navigation.navigate('Login')}>
                      <Text style={styles.buttonText}>¿Tienes una cuenta? Inicia sesión</Text>
                  </Pressable>
                  <View style={styles.copyright}>
                      <Text style={styles.subtitle}>App para el control de lectura de libros</Text>
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
  logo: {
    marginTop: 60,
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
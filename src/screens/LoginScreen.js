import React, {useState, useContext} from 'react';
import {
  Keyboard,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { HelperText } from 'react-native-paper';

import { ApiContext } from '../context/ApiProvider';

const LoginScreen = ({navigation}) => {
  const {login} = useContext(ApiContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const onLogin = async () => {
    try {
      await login(email.trim(), password);
    } catch (err) {
      console.log(err);
      setAuthError(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.center}>
          <Text style={styles.title}>Programa lector</Text>
          <View style={styles.form}>
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
          </View>
          <HelperText
            style={styles.error}
            type="error"
            visible={authError !== '' && authError !== null}>
            Usuario o contraseña incorrecta
          </HelperText>
          <Pressable style={styles.button} onPress={onLogin}>
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => navigation.navigate('Registro')}>
            <Text style={styles.buttonText}>¿No tienes una cuenta? Registrate</Text>
          </Pressable>
          <View style={styles.copyright}>
            <Text style={styles.subtitle}>Leer itinerarios</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
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
    fontSize: 60,
    fontWeight: '600',
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

export default LoginScreen;
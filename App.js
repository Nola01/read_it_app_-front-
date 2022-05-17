/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler'
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import DrawerNavigator from './src/navigation/DrawerNavigator';
import { AuthProvider } from './src/context/AuthProvider';

const App = () => {
  return (
    <AuthProvider>
      <DrawerNavigator/>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  
});

export default App;

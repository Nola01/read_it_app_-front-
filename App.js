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

import { Provider as PaperProvider } from 'react-native-paper';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { AuthProvider } from './src/context/AuthProvider';
import { ApiProvider } from './src/context/ApiProvider';

const App = () => {
  return (
    <PaperProvider>
      <AuthProvider>
        <ApiProvider>
          <DrawerNavigator/>
        </ApiProvider>
      </AuthProvider>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  
});

export default App;

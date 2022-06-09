/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler'
import React, { createRef } from 'react'
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
import { NavigationContainer } from '@react-navigation/native'  
import { AuthProvider } from './src/context/AuthProvider';
import { ApiProvider } from './src/context/ApiProvider';

const navigationRef = createRef()
const nav = () => navigationRef.current


const App = () => {
  return (
    <PaperProvider>
      <AuthProvider>
        <ApiProvider>
          <NavigationContainer ref={navigationRef}>
            <DrawerNavigator nav={nav}/>
          </NavigationContainer>
        </ApiProvider>
      </AuthProvider>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  
});

export default App;

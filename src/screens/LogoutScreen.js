import * as React from 'react';
import { Button, View } from 'react-native';
import { Text } from 'react-native-paper';

const LogoutScreen = ({ navigation }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Logout Screen</Text>
      </View>
    );
}

export default LogoutScreen;
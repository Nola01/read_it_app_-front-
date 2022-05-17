import React, {useContext} from 'react';

import { AuthContext } from '../context/AuthProvider';
import LoginScreen from './LoginScreen';

const LogoutScreen = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  authContext.logout();
  return <LoginScreen />;
}

export default LogoutScreen;
import 'react-native-gesture-handler';

import React from 'react';
import {StatusBar, YellowBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

YellowBox.ignoreWarnings(['Unrecognized WebSocket']);

import {AuthProvider} from './contexts/auth';

import Routes from './routes';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#f5fcff" />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}

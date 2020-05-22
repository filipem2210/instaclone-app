import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SignInScreen from '../pages/SignIn';
import SignUpScreen from '../pages/SignUp';

const AuthStack = createStackNavigator();

const AuthRoutes = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="SignIn"
      component={SignInScreen}
      options={{
        headerShown: false,
      }}
    />
    <AuthStack.Screen
      name="SignUp"
      component={SignUpScreen}
      options={{
        headerShown: false,
      }}
    />
  </AuthStack.Navigator>
);

export default AuthRoutes;

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeTabs from './bottomTabs';

const AppStack = createStackNavigator();

const AppRoutes = () => (
  <AppStack.Navigator>
    <AppStack.Screen
      name="Feed"
      component={HomeTabs}
      options={{
        headerShown: false,
      }}
    />
  </AppStack.Navigator>
);

export default AppRoutes;

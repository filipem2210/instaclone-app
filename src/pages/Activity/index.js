import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

const ActivityStack = createStackNavigator();

function Activity() {
  return (
    <View>
      <Text>Activity</Text>
    </View>
  );
}

export default function ActivityScreen() {
  return (
    <ActivityStack.Navigator>
      <ActivityStack.Screen name="Activity" component={Activity} />
    </ActivityStack.Navigator>
  );
}

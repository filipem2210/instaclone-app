import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

const SearchStack = createStackNavigator();

function Search() {
  return (
    <View>
      <Text>Search</Text>
    </View>
  );
}

export default function SearchScreen() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Search" component={Search} />
    </SearchStack.Navigator>
  );
}

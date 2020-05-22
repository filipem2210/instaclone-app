import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import IconFoundation from 'react-native-vector-icons/Foundation';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';

import FeedScreen from '../pages/Feed';
import SearchScreen from '../pages/Search';
import NewPostScreen from '../pages/NewPost';
import ActivityScreen from '../pages/Activity';
import ProfileScreen from '../pages/Profile';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: '#000',
        inactiveTintColor: '#ddd',
        showLabel: false,
      }}>
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: ({color}) => (
            <IconFoundation name="home" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({color}) => (
            <IconIonicons name="ios-search" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="NewPost"
        component={NewPostScreen}
        options={{
          tabBarIcon: ({color}) => (
            <IconFontAwesome name="plus-square-o" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          tabBarIcon: ({color}) => (
            <IconIonicons name="md-heart" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color}) => (
            <IconMaterialIcons name="person" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

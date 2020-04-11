import React from 'react';
import { Platform, I18nManager } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import FollowUpScreen from '../screens/FollowUpScreen';
import BookingScreen from '../screens/BookingScreen';

if (Platform.OS === 'ios') {
    I18nManager.forceRTL(true)
}

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'איזור אישי',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='ios-contact'
    />
  ),
};

HomeStack.path = '';

const FollowUpStack = createStackNavigator(
  {
    Links: FollowUpScreen,
  },
  config
);

FollowUpStack.navigationOptions = {
  tabBarLabel: 'מעקב טיפולים',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name='ios-car' />
  ),
};

FollowUpScreen.path = '';

const BookingStack = createStackNavigator(
  {
    Settings: BookingScreen,
  },
  config
);

BookingStack.navigationOptions = {
  tabBarLabel: 'הזמנת טיפולים',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name='ios-calendar' />
  ),
};

BookingStack.path = '';

const tabNavigator = createBottomTabNavigator({
    HomeStack,
    FollowUpStack,
    BookingStack,
});

tabNavigator.path = '';

export default tabNavigator;

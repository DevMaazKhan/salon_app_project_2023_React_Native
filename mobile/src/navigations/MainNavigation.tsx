import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthScreen from '../screens/AuthScreen/Auth.screen';
import MainDrawerNavigation from './MainDrawerNavigation';

const Stack = createNativeStackNavigator();

function MainNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="HomeDrawer" component={MainDrawerNavigation} />
    </Stack.Navigator>
  );
}
export default MainNavigation;

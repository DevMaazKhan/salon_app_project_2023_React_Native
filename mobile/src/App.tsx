import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {COLORS} from './config/setup';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigation from './navigations/MainNavigation';

function App() {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.darkColor}
        translucent
      />
      <MainNavigation />
    </NavigationContainer>
  );
}

export default App;

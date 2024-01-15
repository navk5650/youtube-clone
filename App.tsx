import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {MainStack} from './src/navigation';
import {useAppStore} from './src/store';

const App = () => {
  const {isDark} = useAppStore();

  const myTheme = {...(isDark ? DarkTheme : DefaultTheme)};

  return (
    <NavigationContainer theme={myTheme}>
      <MainStack />
    </NavigationContainer>
  );
};

export default App;

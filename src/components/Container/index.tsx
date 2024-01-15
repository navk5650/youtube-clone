import {ViewStyle, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import React from 'react';

interface IContainer {
  viewStyle?: ViewStyle;
  children: React.ReactNode;
}

const Container: React.FC<IContainer> = ({children, viewStyle}) => {
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={Style.flex1}
        style={[viewStyle, Style.flex]}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Container;

export const Style = StyleSheet.create({
  flex1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex: {
    height: '100%',
  },
});

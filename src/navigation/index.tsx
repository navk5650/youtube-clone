/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {HeaderTitleProps} from '@react-navigation/elements/src/types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FaBrand from 'react-native-vector-icons/FontAwesome6';
import Home from '../components/Home';
import {Text, View} from 'react-native';
import Setting from '../components/Setting';
import Shorts from '../components/Shorts';

const Tab = createBottomTabNavigator();

const HomeIcon = ({color, size}: {color: string; size: number}) => {
  return <MaterialCommunityIcons name="home" color={color} size={size} />;
};

const ShortsIcon = ({color, size}: {color: string; size: number}) => {
  return <FaBrand name="squarespace" color={color} size={size} />;
};

const ProfileIcon = ({color, size}: {color: string; size: number}) => {
  return (
    <MaterialCommunityIcons
      name="account-reactivate"
      color={color}
      size={size}
    />
  );
};

const youtubeHeader = (props: HeaderTitleProps) => {
  const {allowFontScaling, tintColor} = props;
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <FaBrand
        name="youtube"
        color={'red'}
        size={28}
        allowFontScaling={allowFontScaling}
      />
      <Text
        allowFontScaling={allowFontScaling}
        style={{
          color: tintColor,
          fontWeight: '500',
          fontSize: 18,
          paddingLeft: 5,
        }}>
        YouTube
      </Text>
    </View>
  );
};

export const MainStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: 'left',
        headerTitle: youtubeHeader,
        headerStyle: {
          // backgroundColor: 'red',
        },
        tabBarActiveTintColor: 'red',
      }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: HomeIcon,
        }}
        component={Home}
      />
      {/* <Tab.Screen
        name="Shorts"
        component={Shorts}
        options={{
          tabBarIcon: ShortsIcon,
        }}
      /> */}
      <Tab.Screen
        name="You"
        component={Setting}
        options={{
          tabBarIcon: ProfileIcon,
        }}
      />
    </Tab.Navigator>
  );
};

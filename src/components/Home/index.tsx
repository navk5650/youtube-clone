import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import YoutubePlayer from '../YoutubePlayer';
import {FlashList} from '@shopify/flash-list';
import {useAppStore} from '../../store';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const {youtubeLinks} = useAppStore();
  const navigation = useNavigation();

  const renderItem = ({item}: {item: string}) => {
    return <YoutubePlayer url={item} />;
  };

  const navigateToAdd = () => {
    navigation.navigate('You');
  };

  const noContent = () => {
    return (
      <View style={Style.center}>
        <Text style={Style.text}>No youtube videos found!</Text>
        <TouchableOpacity onPress={navigateToAdd}>
          <Text style={Style.text2}>+ Add Links</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={Style.container}>
      <FlashList
        renderItem={renderItem}
        keyExtractor={item => item?.toString()}
        estimatedItemSize={250}
        data={youtubeLinks}
        ListEmptyComponent={noContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Home;

export const Style = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 11,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
  },
  text2: {
    color: 'gray',
    marginTop: 22,
    textAlign: 'center',
    fontSize: 18,
  },
});

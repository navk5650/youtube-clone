/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet, Alert} from 'react-native';
import {useAppStore} from '../../store';
import Entypo from 'react-native-vector-icons/Entypo';
import {FlashList} from '@shopify/flash-list';
import {useTheme} from '@react-navigation/native';

function isValidURL(url: string) {
  const youtubeVideoUrlRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/)?[\w-]+|youtu\.be\/[\w-]+)(\?.*)?$/;
  return youtubeVideoUrlRegex.test(url);
}

const Setting = () => {
  const [inputText, setInputText] = useState<string>('');
  const [urlToRemove, setUrlToRemove] = useState<string[]>([]);

  const {youtubeLinks, addLink, replaceLinks} = useAppStore();
  const {colors} = useTheme();

  const addUrl = (link: string) => {
    if (link.trim() === '') {
      return link;
    }
    if (isValidURL(link)) {
      addLink(link);
      setInputText('');
    } else {
      Alert.alert('Oops!', `Invalid URL ${link}`);
    }
    return link;
  };

  const handleAddUrl = () => {
    const links = inputText?.trim();
    var individualUrls = links.replaceAll(',', '\n').split('\n');

    // Process each individual URL
    individualUrls.forEach(addUrl);
  };

  const removeLink = useCallback(
    (url: string) => {
      setUrlToRemove(prevUrls => {
        if (prevUrls.includes(url)) {
          // If the URL is already in the state, remove it
          return prevUrls.filter(link => link !== url);
        } else {
          // If the URL is not in the state, add it
          return [...new Set([...prevUrls, url])];
        }
      });
    },
    [setUrlToRemove],
  );

  const updateRemovedLinks = () => {
    const newLinks = youtubeLinks.filter(link => !urlToRemove.includes(link));
    replaceLinks(newLinks);
    setUrlToRemove([]);
  };

  const renderItem = useCallback(
    ({item}: {item: string}) => {
      const isDeleted = urlToRemove.includes(item);
      return (
        <View
          style={{
            marginVertical: 3,
            paddingVertical: 5,
            marginHorizontal: 11,
            paddingHorizontal: 9,
            minHeight: 35,
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
          }}>
          <View style={{flex: 1}}>
            <Text
              style={[
                isDeleted ? Style.deleted : null,
                {color: '#000', textDecorationColor: '#fff000'},
              ]}
              numberOfLines={1}>
              {item}
            </Text>
          </View>
          <View style={{marginLeft: 11}}>
            <Entypo
              color={'#000'}
              name={isDeleted ? 'ccw' : 'circle-with-cross'}
              onPress={() => removeLink(item)}
              size={24}
            />
          </View>
        </View>
      );
    },
    [removeLink, urlToRemove],
  );

  return (
    <View style={{flex: 1}}>
      <View style={Style.container}>
        <TextInput
          multiline
          placeholder="Enter YouTube URLs (one per line)"
          value={inputText}
          placeholderTextColor={'gray'}
          onChangeText={text => setInputText(text)}
          style={Style.multiline}
        />
        <Button title="Add URL" onPress={handleAddUrl} />
      </View>
      <View style={{height: 25}} />
      <View style={{flex: 9}}>
        <View style={{height: '100%'}}>
          <FlashList
            extraData={urlToRemove}
            keyExtractor={item => item?.toString()}
            data={youtubeLinks}
            renderItem={renderItem}
            estimatedItemSize={200}
          />
        </View>
      </View>
      <View style={{flex: 1}}>
        {urlToRemove.length ? (
          <View style={Style.bottom}>
            <Button onPress={updateRemovedLinks} title="Update" />
            <Button
              onPress={() => setUrlToRemove([])}
              color={colors.text}
              title="Cancel"
            />
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default Setting;

const Style = StyleSheet.create({
  container: {
    paddingHorizontal: 11,
  },
  text: {marginTop: 20, fontWeight: 'bold', fontSize: 16},
  deleted: {
    textDecorationLine: 'line-through',
    textDecorationColor: 'red',
  },
  multiline: {
    marginTop: 11,
    color: '#000',
    height: 150,
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    alignItems: 'center',
    textAlign: 'left',
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'space-around',
    paddingVertical: 5,
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {height: -2, width: 2},
  },
});

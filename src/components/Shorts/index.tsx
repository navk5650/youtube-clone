import React from 'react';
import {Dimensions} from 'react-native';
import {View} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

export default function Shorts() {
  return (
    // rotate by 90 deg for horizontal video
    <YoutubePlayer
      videoId={'XSqi5s3rfqk'}
      // video height -> screen width
      height={SCREEN_WIDTH}
      // video width -> screen height
      width={SCREEN_HEIGHT}
      // prevent aspect ratio auto sizing
      webViewProps={{
        injectedJavaScript: `
            var element = document.getElementsByClassName('container')[0];
            element.style.position = 'unset';
            element.style.paddingBottom = 'unset';
            true;
          `,
      }}
    />
  );
}

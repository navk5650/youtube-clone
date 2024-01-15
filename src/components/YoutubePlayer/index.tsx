import {Pressable, View} from 'react-native';
import React, {useState} from 'react';
import YoutubeIframe, {PLAYER_STATES} from 'react-native-youtube-iframe';

export const getYouTubeVideoId = (url: string) => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match && match[1];
};

interface IYoutube {
  url: string;
}

const YoutubePlayer: React.FC<IYoutube> = ({url}) => {
  const [play, setPlay] = useState<boolean>(false);

  const videoId = getYouTubeVideoId(url) ?? '';

  const onStateChange = (state: PLAYER_STATES) => {
    if (state === PLAYER_STATES.ENDED) {
      console.log('Video ended');
      setPlay(false);
    }
    if (state === PLAYER_STATES.PAUSED) {
      setPlay(false);
    }
    if (state === PLAYER_STATES.PLAYING) {
      setPlay(true);
    }
  };

  return (
    <View>
      <Pressable onPress={() => setPlay(true)} disabled={play}>
        <YoutubeIframe
          height={300}
          play={play}
          onChangeState={onStateChange}
          videoId={videoId}
        />
      </Pressable>
    </View>
  );
};

export default YoutubePlayer;

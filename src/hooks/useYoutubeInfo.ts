import {useEffect, useState} from 'react';
import axios from 'axios';
import HTMLParser from 'react-native-html-parser';

const parser = new HTMLParser.DOMParser();
const useYoutubeInfo = ({url}: {url: string}) => {
  const [videoInfo, setVideoInfo] = useState({title: '', description: ''});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const html = response.data;

        // Parse HTML content to extract title and description
        const parsedHtml = parser.parseFromString(html, 'text/html');

        console.log(html);
        console.log(parsedHtml);

        // Replace 'YOUR_TITLE_SELECTOR' and 'YOUR_DESCRIPTION_SELECTOR'
        // with the actual CSS selectors for the title and description elements
        const titleElement = parsedHtml
          ?.querySelector('#above-the-fold')
          ?.children?.title?.querySelector('yt-formatted-string')?.innerHTML;
        const descriptionElement = '';

        // if (titleElement && descriptionElement) {
        //   const title = titleElement.text || titleElement.children[0].text;
        //   const description =
        //     descriptionElement.text || descriptionElement.children[0].text;

        setVideoInfo({title: titleElement, description: descriptionElement});
        // } else {
        //   console.error('Unable to retrieve video information.');
        // }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [url]);

  return videoInfo;
};

export default useYoutubeInfo;

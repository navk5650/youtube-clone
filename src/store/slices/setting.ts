import {StateCreator} from 'zustand';

export interface ISettingSlice {
  youtubeLinks: string[];
  addLink: (url: string) => void;
  replaceLinks: (urls: string[]) => void;
}

export const createAppSetting: StateCreator<
  ISettingSlice,
  [],
  [],
  ISettingSlice
> = set => ({
  youtubeLinks: [],
  addLink: (url: string) =>
    set(state => ({
      youtubeLinks: [...new Set([...state.youtubeLinks, url])],
    })),
  replaceLinks: (urls: string[]) =>
    set(() => ({
      youtubeLinks: urls,
    })),
});

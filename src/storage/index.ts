import {MMKV} from 'react-native-mmkv';
import {StateStorage} from 'zustand/middleware';

export const Storage = new MMKV({
  id: 'youtube-storage',
});

export const zustandStorage: StateStorage = {
  getItem: (name: string) => {
    const data = Storage.getString(name);
    return data ?? null;
  },

  setItem(name: string, value: string) {
    return Storage.set(name, value);
  },

  removeItem(name: string) {
    return Storage.delete(name);
  },
};

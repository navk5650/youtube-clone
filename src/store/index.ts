import {create} from 'zustand';
import {ISettingSlice, createAppSetting} from './slices/setting';
import {IAppConfig, createAppConfig} from './slices/appConfig';
import {createJSONStorage, persist} from 'zustand/middleware';
import {zustandStorage} from '../storage';

export const useAppStore = create<IAppConfig & ISettingSlice>()(
  persist(
    (...a) => ({
      ...createAppSetting(...a),
      ...createAppConfig(...a),
    }),
    {
      name: 'youtube-storage',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);

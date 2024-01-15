import {StateCreator} from 'zustand';

export interface IAppConfig {
  isDark: boolean;
  toggleTheme: () => void;
}

export const createAppConfig: StateCreator<
  IAppConfig,
  [],
  [],
  IAppConfig
> = set => ({
  isDark: false,
  toggleTheme: () => set(state => ({isDark: !state.isDark})),
});

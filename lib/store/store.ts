import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { charactersApi } from './CharactersApi';

export const makeStore = () =>
  configureStore({
    reducer: { [charactersApi.reducerPath]: charactersApi.reducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(charactersApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });

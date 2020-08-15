/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { Reducer, Action } from 'redux';
import { PersistPartial } from 'redux-persist/lib/persistReducer';

export default (reducers: any): Reducer<PersistPartial, Action<any>> => {
  const persistedReducer = persistReducer(
    {
      key: 'root',
      storage,
      whitelist: ['auth'],
    },
    reducers
  );

  return persistedReducer;
};

import { createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';
import { LOCAL_STORAGE_KEY } from '../../constants';

export const createLocalStore = <T extends Dict<any>>(value: T) => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY),
    [state, setState] = createStore<T>(stored ? JSON.parse(stored) : value);

  createEffect(() =>
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state)),
  );
  return [state, setState] as const;
};

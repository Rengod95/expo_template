import {createStore} from 'zustand/vanilla';
import {devtools} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';
import {useStore} from 'zustand';

export interface GlobalLoadingState {
  isLoading: boolean;
}

export interface GlobalLoadingActions {
  setIsLoading: (value: boolean) => void;
}

const initialState: GlobalLoadingState = {
  isLoading: false,
};

export const GlobalLoadingStore = createStore<GlobalLoadingState & GlobalLoadingActions>()(
  devtools(
    immer(set => ({
      ...initialState,

      setIsLoading: value =>
        set(state => {
          state.isLoading = value;
        }),
    })),
    {name: 'global-loading-store'},
  ),
);

export const useGlobalLoadingStore = () => {
  const store = useStore(GlobalLoadingStore);
  return store;
};

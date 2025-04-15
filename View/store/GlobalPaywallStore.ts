import { createStore, useStore } from "zustand";

export type GlobalPaywallStoreState = {
  isPaywallOpen: boolean;
};

export type GlobalPaywallStoreActions = {
  setIsPaywallOpen: (isPaywallOpen: boolean) => void;
};

export type GlobalPaywallStore = GlobalPaywallStoreState &
  GlobalPaywallStoreActions;

const initialState: GlobalPaywallStoreState = {
  isPaywallOpen: false,
};

export const GlobalPaywallStore = createStore<GlobalPaywallStore>((set) => ({
  ...initialState,
  setIsPaywallOpen: (isPaywallOpen) => {
    set({ isPaywallOpen });
  },
}));

export const useGlobalPaywallStore = () => {
  return useStore(GlobalPaywallStore);
};

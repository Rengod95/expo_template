import {createStore, useStore} from 'zustand';

export type PaymentStoreState = {
  hasUserActiveSubscription: boolean;
  isInitialized: boolean;
};

export type PaymentStoreActions = {
  setHasUserActiveSubscription: (hasUserActiveSubscription: boolean) => void;
  setIsInitialized: (isInitialized: boolean) => void;
};

export type PaymentStore = PaymentStoreState & PaymentStoreActions;

const initialState: PaymentStoreState = {
  hasUserActiveSubscription: false,
  isInitialized: false,
};

export const createPaymentStore = () =>
  createStore<PaymentStore>(set => ({
    ...initialState,
    setHasUserActiveSubscription: (hasUserActiveSubscription: boolean) => set({hasUserActiveSubscription}),
    setIsInitialized: (isInitialized: boolean) => set({isInitialized}),
  }));

export const PaymentStore = createPaymentStore();

export const usePaymentStore = () => {
  return useStore(PaymentStore);
};

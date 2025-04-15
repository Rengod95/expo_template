import { createStore } from "zustand/vanilla";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Locale, Calendar } from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import { I18N_STORAGE_KEY } from "./consts";
import { useStore } from "zustand";
import { StoreService } from "@/service/lib/Store/adapter";

export type I18nStoreStates = {
  // without region code
  activeLanguageCode: string;
  // Localization.getLocales()[0]!.languageCode
  userPreferredLanguageCode: string;
  isInitialized: boolean;
  // Localization.getLocales()[0]
  activeLocale: Locale | null;
  // Localization.getCalendars()[0]
  activeCalendar: Calendar | null;
};

export type I18nStoreActions = {
  setActiveLanguageCode: (languageCode: string) => void;
  setUserPreferredLanguageCode: (languageCode: string) => void;
  setIsInitialized: (isInitialized: boolean) => void;
  setActiveLocale: (locale: Locale) => void;
  setActiveCalendar: (calendar: Calendar) => void;
  initalize: () => void;
};

const initialState: I18nStoreStates = {
  activeLanguageCode: "en",
  userPreferredLanguageCode: "en",
  isInitialized: false,
  activeLocale: null,
  activeCalendar: null,
};

export const createI18nStore = () =>
  StoreService.createPersistentStore<I18nStoreStates & I18nStoreActions>(
    I18N_STORAGE_KEY,
    (set) => ({
      ...initialState,

      setActiveLanguageCode: (languageCode: string) =>
        set({ activeLanguageCode: languageCode }),
      setUserPreferredLanguageCode: (languageCode: string) =>
        set({ userPreferredLanguageCode: languageCode }),
      setIsInitialized: (isInitialized: boolean) => set({ isInitialized }),
      setActiveLocale: (locale: Locale) => set({ activeLocale: locale }),
      setActiveCalendar: (calendar: Calendar) =>
        set({ activeCalendar: calendar }),

      initalize: async () => {
        const locale = Localization.getLocales()[0]!;
        const calendar = Localization.getCalendars()[0]!;

        set({
          activeLocale: locale,
          activeCalendar: calendar,
        });
      },
    })
  );

export const I18nStore = createI18nStore();

export const useI18nStore = () => {
  const store = useStore(I18nStore);
  return store;
};

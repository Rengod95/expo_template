// Enable newer features like async imports
// import '@expo/metro-runtime';

import {InitializationSingleTon} from '@/service/lib/shared';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import {I18N_STORAGE_KEY} from '@/service/lib/I18n/consts';
import {I18nStore, I18nStoreStates} from '@/service/lib/I18n/store';
import {languageModules} from '@/service/lib/I18n/languageModule';
import {StorageService} from '@/service/lib/Storage/Adpater';

export class I18nServiceAdapter extends InitializationSingleTon<I18nServiceAdapter> {
  private i18n: typeof i18n = i18n;
  private initialized: boolean = false;
  private useI18n = process.env.EXPO_PUBLIC_USE_I18N;
  private useLocalLanguageAssets = process.env.EXPO_PUBLIC_USE_LOCAL_LANGUAGE_ASSETS;
  private remoteLanguageFetcher: ((languageCode: string) => Promise<any>) | null = null;
  private localLanguageModule: Record<string, any> | null = null;

  constructor(_localLanguageModule?: Record<string, any> | undefined, _remoteLanguageFetcher?: (languageCode: string) => Promise<any>) {
    super();

    if (this.useLocalLanguageAssets) {
      if (!_localLanguageModule) {
        throw new Error('localLanguageModule is required');
      }

      this.localLanguageModule = _localLanguageModule;

      return;
    }

    try {
      if (!_remoteLanguageFetcher) {
        throw new Error('remoteLanguageFetcher is required');
      }

      this.remoteLanguageFetcher = _remoteLanguageFetcher;
    } catch (error) {
      console.error('Failed to initialize I18nService:', error);
    }
  }

  /**
   * i18n 서비스를 초기화합니다.
   * 사용자 디바이스 언어 설정을 기본값으로 사용합니다.
   * @param resources 번역 리소스 객체
   * @param defaultLanguage 기본 언어 코드 (옵션)
   */
  override async initialize(): Promise<void> {
    if (this.initialized || !this.useI18n) return;

    try {
      const I18n = I18nStore.getState();
      const languageToUse = I18n.activeLanguageCode || I18n.userPreferredLanguageCode || 'en';

      const resources = await this.getResourceByLanguageCode(languageToUse);

      const fallbackResources = await this.getResourceByLanguageCode('en');

      // 6. i18next 초기화
      this.i18n.use(initReactI18next).init({
        compatibilityJSON: 'v4',
        lng: languageToUse,
        fallbackLng: 'en',
        debug: __DEV__,
        interpolation: {
          escapeValue: false,
        },
        react: {
          useSuspense: true,
        },
        resources: {
          [languageToUse]: {
            translation: resources,
          },
          en: {
            translation: fallbackResources,
          },
        },
      });

      console.log(`I18nService initialized with language: ${languageToUse}`);
    } catch (error) {
      console.error('Failed to initialize I18nService:', error);
    } finally {
      this.initialized = true;
    }
  }

  public async getStoredUserPreferredLanguageCode(): Promise<string | null> {
    const i18nStorageStore = await StorageService.getData<I18nStoreStates>(I18N_STORAGE_KEY);
    return i18nStorageStore?.userPreferredLanguageCode ?? null;
  }

  public async storeUserPreferredLanguageCode(_languageCode: string): Promise<void> {
    await StorageService.storeData<Partial<I18nStoreStates>>(I18N_STORAGE_KEY, {
      userPreferredLanguageCode: _languageCode ?? 'en',
    });
  }

  public async getLocalLanguageModule(languageCode: keyof typeof languageModules) {
    return languageModules[languageCode];
  }

  public async getResourceByLanguageCode(languageCode: string) {
    if (this.useLocalLanguageAssets) {
      return this.getLocalLanguageModule(languageCode as keyof typeof languageModules);
    }
    return this.remoteLanguageFetcher?.(languageCode);
  }

  /**
   * i18n 인스턴스를 직접 반환합니다.
   */
  public getI18nInstance(): typeof i18n {
    return this.i18n;
  }

  public t(...args: Parameters<typeof i18n.t>) {
    return this.i18n.t(...args);
  }
}

export const I18nService = I18nServiceAdapter.getInstance(languageModules);

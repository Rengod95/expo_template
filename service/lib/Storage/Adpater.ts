import {InitializationSingleTon} from '@/service/lib/shared';
import AsyncStorage from '@react-native-async-storage/async-storage';
import serviceMediator from '@/service/lib/shared';
export class StorageServiceAdapter extends InitializationSingleTon<StorageServiceAdapter> {
  constructor() {
    super();
    serviceMediator.registerServiceForInitialization(this);
  }

  public storeData = async <T extends object>(key: string, value: T) => {
    try {
      const parsedToString = JSON.stringify(value);

      await AsyncStorage.setItem(key, parsedToString);
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  public getData = async <T = unknown>(key: string): Promise<T | null> => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  public removeDataAsync = async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e: unknown) {
      console.error(e);
    }
  };
}

export const StorageService = new StorageServiceAdapter();

import { HydrationManager } from "@/service/lib/Store/HydrationManager";
import { InitializationSingleTon } from "@/service/lib/shared";
import { createStore, StateCreator, StoreApi } from "zustand";
import {
  persist,
  createJSONStorage,
  PersistOptions,
  PersistStorage,
} from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

// StorePersist 타입이 내보내지지 않았을 수 있으므로, 필요한 부분을 직접 정의하거나 가져옵니다.
// 실제 zustand 버전의 타입 정의를 확인하는 것이 가장 좋습니다.
// 아래는 persist.d.ts 기반의 예상 타입입니다.
type StorePersist<T> = {
  persist: {
    setOptions: (options: Partial<PersistOptions<T, unknown>>) => void;
    clearStorage: () => void;
    rehydrate: () => Promise<void> | void;
    hasHydrated: () => boolean;
    onHydrate: (fn: (state: T) => void) => () => void;
    onFinishHydration: (fn: (state: T) => void) => () => void; // 이 메서드를 사용할 것입니다.
    getOptions: () => Partial<PersistOptions<T, unknown>>;
  };
};

// StoreApi<TState> 와 StorePersist<TState> 를 합칩니다.
type StoreWithPersist<TState> = StoreApi<TState> & StorePersist<TState>;

export class StoreServiceAdapter extends InitializationSingleTon<StoreServiceAdapter> {
  constructor() {
    super();
  }

  /**
   * Zustand 스토어를 생성하고 영속성 및 하이드레이션 관리를 추가합니다.
   * 타입 추론은 Zustand의 createStore와 유사하게 동작합니다.
   *
   * @template TState 스토어의 상태 및 액션을 포함하는 타입 (초기화 함수로부터 추론됨)
   * @param name 스토어의 고유 이름 (영속성 키로 사용됨)
   * @param initializer (set, get, api) => ({ ... }) 형태의 Zustand 초기화 함수
   * @param config 추가 설정 (onHydrated 콜백, persist 옵션 등)
   * @returns 생성된 Zustand StoreApi
   */
  createPersistentStore = <TState>(
    name: string,
    initializer: StateCreator<TState, [], []>,
    config: {
      onHydrated?: (state: TState) => void;
      persistOptions?: Omit<
        PersistOptions<TState, unknown>,
        "name" | "storage" | "onRehydrateStorage"
      >;
    } = {}
  ): StoreWithPersist<TState> => {
    HydrationManager.registerTarget(name);

    const persistOptions: PersistOptions<TState, unknown> = {
      name: name,
      storage: createJSONStorage(() => AsyncStorage),
      ...config.persistOptions,
      onRehydrateStorage: (_state) => {
        console.log(`[Hydration] Rehydrating storage for: ${name}`);
        return undefined;
      },
    };

    const store = createStore(
      persist(initializer, persistOptions)
    ) as StoreWithPersist<TState>;

    store.persist.onFinishHydration((state) => {
      HydrationManager.markAsHydrated(name);
      console.log(`[Hydration] Finished hydration for: ${name}`);
      config.onHydrated?.(state);
    });

    return store;
  };
}

export const StoreService = StoreServiceAdapter.getInstance();

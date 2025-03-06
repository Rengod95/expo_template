/**
 * 글로벌 스토어 관리
 */

import { StoreApi, useStore } from 'zustand';
import { useAuthStore } from './inbound/Auth/store';
import { useI18nStore } from './lib/I18n/store';

/**
 * 인바운드 글로벌 스토어 인터페이스
 */
interface InboundGlobalStoresI {
  AuthStore: StoreApi<any>;
  I18nStore: StoreApi<any>;
  // 추가 스토어들을 여기에 정의
  // MakeupGenerationStore: StoreApi<MakeupGenerationStoreState & MakeupGenerationStoreActions>;
  // HairGenerationStore: StoreApi<HairGenerationStoreState & HairGenerationStoreActions>;
  // TattooGenerationStore: StoreApi<TattooGenerationStoreState & TattooGenerationStoreActions>;
  // GlobalLoadingStore: StoreApi<GlobalLoadingState & GlobalLoadingActions>;
  // NotificationStore: StoreApi<NotificationStoreState & NotificationStoreActions>;
  // ApplicationStore: StoreApi<ApplicationState & ApplicationActions>;
  // DrawingStore: StoreApi<DrawingState & DrawingActions>;
  // TattooExtractionStore: StoreApi<TattooExtractionStoreState & TattooExtractionStoreActions>;
  // GenerationListFilterStore: StoreApi<GenerationListFilterState & GenerationListFilterActions>;
  // ReferenceTagFilterStore: StoreApi<ReferenceTagFilterState & ReferenceTagFilterActions>;
}

/**
 * 상태 추출 타입
 */
type ExtractState<S> = S extends { getState: () => infer X } ? X : never;

/**
 * 인바운드 글로벌 스토어
 */
export const InboundGlobalStores: InboundGlobalStoresI = {
  AuthStore: useAuthStore,
  I18nStore: useI18nStore,
  // 추가 스토어들을 여기에 등록
  // MakeupGenerationStore,
  // HairGenerationStore,
  // TattooGenerationStore,
  // GlobalLoadingStore,
  // NotificationStore,
  // ApplicationStore,
  // DrawingStore,
  // TattooExtractionStore,
  // GenerationListFilterStore,
  // ReferenceTagFilterStore,
} as const;

/**
 * 인바운드 글로벌 스토어 사용 훅
 *
 * @param storeName 사용할 스토어 이름
 * @param selector 선택적 상태 선택자
 * @returns 선택된 스토어 상태
 *
 * @example
 * // 전체 상태 사용
 * const authState = useInboundGlobalStore('AuthStore');
 *
 * // 선택적 상태 사용
 * const user = useInboundGlobalStore('AuthStore', (state) => state.user);
 */
export const useInboundGlobalStore = <K extends keyof typeof InboundGlobalStores>(
  storeName: K,
  selector?: (state: ExtractState<(typeof InboundGlobalStores)[K]>) => any,
): ExtractState<(typeof InboundGlobalStores)[K]> => {
  const store = InboundGlobalStores[storeName];

  if (selector) {
    // 선택적 상태 구독
    return useStore(store, selector);
  }

  // 전체 스토어 상태 구독
  return useStore(store);
};

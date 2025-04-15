/**
 * 서비스 초기화
 */

import serviceMediator from './lib/shared';

// 서비스 클래스들을 임포트
import {HttpServiceAdapter} from './lib/Http/adapter';
import {AuthServiceAdapter} from './lib/Auth/adapter';
import {VariantService} from './lib/utils/Invariant/adapter';
import {I18nServiceAdapter} from './lib/I18n/adapter';
import {AdsServiceAdapter} from './lib/Ads/adapter';
import {StorageServiceAdapter} from './lib/Storage/Adpater';
import {PaymentServiceAdapter} from '@/service/lib/payment/adapter';

/**
 * 모든 서비스를 등록하고 초기화하는 함수
 */
export const initializeServices = async (): Promise<void> => {
  try {
    // 서비스 인스턴스 생성 및 등록
    // 각 서비스는 생성자에서 serviceMediator에 자신을 등록합니다.
    StorageServiceAdapter.getInstance();
    VariantService.getInstance();
    HttpServiceAdapter.getInstance();
    AuthServiceAdapter.getInstance();
    I18nServiceAdapter.getInstance();
    AdsServiceAdapter.getInstance();
    //TODO 결제 서비스 추가
    // PaymentServiceAdapter.getInstance();
    // 모든 서비스 초기화
    await serviceMediator.initializeServices();

    console.log('All services initialized successfully');
  } catch (error) {
    console.error('Failed to initialize services:', error);

    throw error;
  }
};

export default initializeServices;

/**
 * 서비스 초기화
 */

import serviceMediator from './lib/shared';

// 서비스 클래스들을 임포트
import {HttpService} from './lib/Http/adapter';
import {AuthService} from './inbound/Auth/adapter';
import {VariantService} from './lib/utils/Invariant/Adapter';
import {I18nService} from './lib/I18n/adapter';
import {AdsService} from './lib/Ads/adapter';

/**
 * 모든 서비스를 등록하고 초기화하는 함수
 */
export const initializeServices = async (): Promise<void> => {
  try {
    // 서비스 인스턴스 생성 및 등록
    // 각 서비스는 생성자에서 serviceMediator에 자신을 등록합니다.
    HttpService.getInstance();
    AuthService.getInstance();
    VariantService.getInstance();
    I18nService.getInstance();
    AdsService.getInstance();

    // 모든 서비스 초기화
    await serviceMediator.initializeServices();

    console.log('All services initialized successfully');
  } catch (error) {
    console.error('Failed to initialize services:', error);

    throw error;
  }
};

export default initializeServices;

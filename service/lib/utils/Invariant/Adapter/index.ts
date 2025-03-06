/**
 * Invariant 서비스 어댑터
 */

import { InitializationSingleTon } from '../../../shared';

/**
 * Invariant 옵션 타입
 */
type InvariantOptions = {
  type?: 'error' | 'warning' | 'info';
  message?: string;
};

/**
 * Invariant 서비스 클래스
 */
export class VariantService extends InitializationSingleTon<VariantService> {
  /**
   * 조건이 false일 때 에러를 발생시키거나 경고를 출력합니다.
   */
  static invariant(condition: boolean, options: InvariantOptions = {}): asserts condition {
    if (!condition) {
      const { type = 'error', message = 'Invariant failed' } = options;

      switch (type) {
        case 'warning':
          console.warn(message);
          break;
        case 'info':
          console.info(message);
          break;
        case 'error':
        default:
          throw new Error(message);
      }
    }
  }

  /**
   * 서비스 초기화
   */
  async initialize(): Promise<void> {
    console.log('VariantService initialized');
  }
}

// 싱글톤 인스턴스 생성
VariantService.getInstance();

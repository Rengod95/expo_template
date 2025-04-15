/**
 * 서비스 초기화 및 관리를 위한 공유 클래스
 */

/**
 * 초기화 가능한 싱글톤 클래스
 * 모든 서비스 클래스의 기본 클래스로 사용됩니다.
 */
export class InitializationSingleTon<T extends InitializationSingleTon<T>> {
  private static instances: Record<string, any> = {};

  constructor() {
    if (new.target === InitializationSingleTon) {
      throw new TypeError('Cannot construct DeferredInitializationSingleton instances directly');
    }
  }

  /**
   * 클래스의 싱글톤 인스턴스를 반환합니다.
   */
  static getInstance<T extends InitializationSingleTon<T>, Q>(this: new (params?: Q) => T, params?: Q): T {
    const className = this.name;

    if (!InitializationSingleTon.instances[className]) {
      console.log(className, '인스턴스 생성');
      InitializationSingleTon.instances[className] = params ? new this(params) : new this();
    }

    return InitializationSingleTon.instances[className];
  }

  /**
   * 서비스 초기화 메서드
   * 각 서비스 클래스에서 오버라이드하여 구현합니다.
   */
  async initialize(): Promise<void> {}

  /**
   * 등록된 모든 인스턴스를 콘솔에 출력합니다.
   */
  static showInstnaces = () => {
    console.log(InitializationSingleTon.instances);
  };
}

/**
 * 서비스 중재자 클래스
 * 모든 서비스의 등록 및 초기화를 관리합니다.
 */
export class ServiceMediator {
  private services: Set<InitializationSingleTon<any>> = new Set();

  constructor() {}

  /**
   * 초기화할 서비스를 등록합니다.
   */
  public registerServiceForInitialization(service: InitializationSingleTon<any>): void {
    const serviceName = service.constructor.name;

    // 중복된 서비스가 있는지 확인
    for (const registeredService of this.services) {
      const isDuplicatedService = registeredService.constructor.name === serviceName;

      if (isDuplicatedService) {
        console.warn(`Service ${serviceName} is already registered.`);
        return;
      }
    }

    console.log(`${serviceName} service registered`);
    this.services.add(service);
  }

  /**
   * 등록된 모든 서비스를 초기화합니다.
   */
  public async initializeServices(callback?: () => Promise<void>): Promise<void> {
    try {
      // 순차적 초기화
      for (const service of this.services) {
        await service.initialize();
      }
      await callback?.();
    } catch (e: unknown) {
      console.error(`Service initialization failed:`, e);
      throw e; // 에러를 상위로 전파
    }
  }
}

/**
 * 서비스 중재자 싱글톤 인스턴스
 */
export default new ServiceMediator();

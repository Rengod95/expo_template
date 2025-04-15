import {PaymentStore} from '@/service/lib/payment/store';
import {InitializationSingleTon} from '@/service/lib/shared';
import serviceMediator from '@/service/lib/shared';
import {merge} from 'es-toolkit';
import {Platform} from 'react-native';
import Purchases, {
  type CustomerInfo,
  type MakePurchaseResult,
  type PurchasesConfiguration,
  type PurchasesOffering,
  type PurchasesOfferings,
  type PurchasesPackage,
} from 'react-native-purchases';

export class PaymentServiceAdapter extends InitializationSingleTon<PaymentServiceAdapter> {
  private subscriptionPackages: PurchasesPackage[] | null = null;

  constructor() {
    super();
    serviceMediator.registerServiceForInitialization(this);
  }

  configureInitializeOption(options?: PurchasesConfiguration) {
    // TODO
    // Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
    // Purchases.configure(
    //   merge(options ?? {}, {
    //     apiKey:
    //       Platform.OS === "ios"
    //         ? process.env.EXPO_PUBLIC_REVENUE_CAT_PUBLIC_API_KEY_IOS
    //         : process.env.EXPO_PUBLIC_REVENUE_CAT_PUBLIC_API_KEY_ANDROID,
    //   })
    // );
  }

  async getCustomerInfo(): Promise<CustomerInfo> {
    return await Purchases.getCustomerInfo();
  }

  async getOfferings(): Promise<PurchasesOfferings> {
    return await Purchases.getOfferings();
  }

  async getSubscriptionOffering(): Promise<PurchasesOffering> {
    return (await this.getOfferings()).all[process.env.EXPO_PUBLIC_REVENUE_CAT_SUBSCRIPTION_OFFERING_ID];
  }

  async fetchSubscriptionPackages(): Promise<PurchasesPackage[]> {
    return (await this.getSubscriptionOffering()).availablePackages;
  }

  async purchasePackage(_package: PurchasesPackage): Promise<MakePurchaseResult> {
    try {
      return await Purchases.purchasePackage(_package);
    } catch (error: unknown) {
      throw new Error(error as string);
    }
  }

  async restorePurchases(): Promise<CustomerInfo> {
    try {
      return await Purchases.restorePurchases();
    } catch (error) {
      throw new Error(error as string);
    }
  }

  override async initialize(): Promise<void> {
    console.log('payment service initialize');
    try {
      this.subscriptionPackages = await this.fetchSubscriptionPackages();
      console.log('offerings', await this.getOfferings());
      console.log('subscriptionOffering', await this.getSubscriptionOffering());
      const hasUserActiveSubscription = await this.hasUserActiveSubscription();
      console.log('hasUserActiveSubscription', hasUserActiveSubscription);
      PaymentStore.setState({
        isInitialized: true,
        hasUserActiveSubscription,
      });
    } catch (error) {
      console.error('payment service initialize error', error);
    } finally {
      PaymentStore.setState({
        isInitialized: true,
      });
    }
  }

  async hasUserActiveSubscription(): Promise<boolean> {
    return (await this.getCustomerInfo()).activeSubscriptions.length > 0;
  }

  getSubscriptionPackages(): PurchasesPackage[] {
    return this.subscriptionPackages ?? [];
  }
}

export const PaymentService = PaymentServiceAdapter.getInstance();

PaymentService.configureInitializeOption();

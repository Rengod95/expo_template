import { InitializationSingleTon } from "@/service/lib/shared";

export class HydrationManagerAdapter extends InitializationSingleTon<HydrationManagerAdapter> {
  private static instance: HydrationManagerAdapter;
  private targets: Map<string, boolean> = new Map();
  private listeners: Set<(status: boolean) => void> = new Set();
  private onCompleteListeners: Set<() => void> = new Set();
  private previousHydrationStatus: boolean = false;

  constructor() {
    super();
  }

  registerTarget(name: string): void {
    this.targets.set(name, false);
    this.notifyListeners();
  }

  markAsHydrated(name: string): void {
    if (this.targets.has(name)) {
      this.targets.set(name, true);
      this.notifyListeners();
    }
  }

  isFullyHydrated(): boolean {
    if (this.targets.size === 0) {
      return true;
    }
    return Array.from(this.targets.values()).every((value) => value === true);
  }

  onHydrationChange(listener: (status: boolean) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  onComplete(listener: () => void): () => void {
    this.onCompleteListeners.add(listener);
    return () => this.onCompleteListeners.delete(listener);
  }

  private notifyListeners(): void {
    const currentHydrationStatus = this.isFullyHydrated();

    this.listeners.forEach((listener) => listener(currentHydrationStatus));

    if (
      currentHydrationStatus === true &&
      this.previousHydrationStatus === false
    ) {
      const listenersToCall = new Set(this.onCompleteListeners);
      listenersToCall.forEach((listener) => listener());
    }

    this.previousHydrationStatus = currentHydrationStatus;
  }
}

export const HydrationManager = HydrationManagerAdapter.getInstance();

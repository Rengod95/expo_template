import { HydrationManager } from "@/service/lib/Store/HydrationManager";
import { useEffect, useState } from "react";

export const useHydrationStatus = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // 하이드레이션 상태 변경 시 state 업데이트하는 리스너 등록
    const unsubscribe = HydrationManager.onHydrationChange((status) => {
      setIsHydrated(status);
    });

    // 컴포넌트 언마운트 시 리스너 구독 해제
    return () => {
      unsubscribe();
    };
  }, [HydrationManager]); // hydrationManager 인스턴스는 변경되지 않으므로 의존성 배열에 포함

  return isHydrated;
};

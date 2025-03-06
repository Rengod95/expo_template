/**
 * 중첩된 PagerView를 위한 커스텀 훅
 *
 * 이 훅은 PagerView를 사용하는 화면에서 페이지 간 이동 및 진행 상태를 관리합니다.
 * 첫 페이지에서 뒤로가기 시 이전 화면으로 돌아가고, 그 외에는 이전 페이지로 이동합니다.
 */
import {useRouter} from 'expo-router';
import {useMemo, useCallback} from 'react';
import {usePagerView} from 'react-native-pager-view';

/**
 * 중첩된 PagerView를 위한 커스텀 훅
 * @param pagerViewProps PagerView 속성 (페이지 수 등)
 * @returns PagerView 관련 상태 및 메서드
 */
export const useNestedPagerView = (pagerViewProps: {pagesAmount: number}) => {
  const router = useRouter();
  const {AnimatedPagerView, ref, ...rest} = usePagerView(pagerViewProps);

  /**
   * 이전 페이지로 이동
   * 첫 페이지인 경우 이전 화면으로 돌아가고, 그 외에는 이전 페이지로 이동
   */
  const backToPrev = useCallback(() => {
    if (rest.activePage === 0) {
      router.back();
    } else {
      ref.current?.setPage(rest.activePage - 1);
    }
  }, [rest.activePage, ref, router]);

  /**
   * 다음 페이지로 이동
   */
  const proceedToNext = useCallback(() => {
    rest.setPage(rest.activePage + 1);
  }, [rest.activePage, rest.setPage]);

  /**
   * 현재 진행 상태 (퍼센트)
   */
  const progressValue = useMemo(() => {
    return ((rest.activePage + 1) / rest.pages.length) * 100;
  }, [rest.activePage, rest.pages]);

  return {backToPrev, proceedToNext, progressValue, AnimatedPagerView, ref, ...rest};
};

export default useNestedPagerView;

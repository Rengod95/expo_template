/**
 * 루트 인덱스 페이지
 *
 * 이 페이지는 보호된 라우트로 리다이렉트합니다.
 */

import {Redirect} from 'expo-router';
import {useCheckAllRequiredPermissionGranted} from '@/application/permission/checkAllRequiredPermissionGranted';

export default function Index() {
  const {isAllRequiredPermissionGranted} = useCheckAllRequiredPermissionGranted();

  if (!isAllRequiredPermissionGranted) {
    return <Redirect href="/permission" />;
  }

  return <Redirect href="/(protected)" />;
}

/**
 * 루트 인덱스 페이지
 *
 * 이 페이지는 보호된 라우트로 리다이렉트합니다.
 */

import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/(protected)" />;
}

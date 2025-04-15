import { REQUIRED_PERMISSIONS } from "@service/lib/Permission/consts";
import { useMemo } from "react";
import { Alert } from "react-native";

export const useRequestRequiredPermissions = () => {
  const hooks = useMemo(
    () => REQUIRED_PERMISSIONS.map((permission) => permission.hook()),
    []
  );

  const statuses = hooks.map((hook) => {
    return hook[0];
  });

  const requesters = hooks.map((hook) => {
    return hook[1];
  });

  const handleRequestPermissions = async () => {
    try {
      // 모든 권한 요청을 병렬로 실행하고 결과를 기다립니다.
      const results = await Promise.all(
        requesters.map((requester) => requester())
      );

      // 모든 요청이 성공했는지 확인합니다.
      const allGranted = results.every((permission) => permission.granted);

      if (!allGranted) {
        // 하나라도 거부된 권한이 있으면 알림 표시
        Alert.alert(
          "알림",
          "필수 권한 중 일부가 거부되었습니다. 앱 설정에서 권한을 허용해주세요."
        );
        // 또는 거부된 권한만 다시 요청하는 로직 추가 가능
      }
      // 모든 권한이 허용되면 리디렉션 로직은 이미 상단에서 처리되므로 별도 처리 불필요
    } catch (error) {
      console.error("권한 요청 중 오류 발생:", error);
      Alert.alert("오류", "권한을 요청하는 중에 문제가 발생했습니다.");
    }
  };

  const isAllRequiredPermissionGranted = statuses.every(
    (status) => status?.granted
  );

  return {
    isAllRequiredPermissionGranted,
    handleRequestPermissions,
  };
};

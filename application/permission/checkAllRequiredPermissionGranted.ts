import {useState} from 'react';

// @TODO 필요한 권한 훅 추가
export const useCheckAllRequiredPermissionGranted = () => {
  const [isAllRequiredPermissionGranted, setIsAllRequiredPermissionGranted] = useState(false);

  return {
    isAllRequiredPermissionGranted,
    setIsAllRequiredPermissionGranted,
  };
};

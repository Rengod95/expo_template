import {useCallback, useEffect} from 'react';
import Constants from 'expo-constants';
import {useInboundGlobalStore} from '@/service/store';
import {getAuth, signInAnonymously} from '@react-native-firebase/auth';

/**
 * 인증 관리 훅
 */
export const useAutoSignIn = () => {
  const AuthStore = useInboundGlobalStore('AuthStore');

  useEffect(() => {
    const signIn = async () => {
      console.log('signIn');
      const auth = getAuth();
      const signInResult = await signInAnonymously(auth);

      if (!signInResult.user) {
        console.log('signInResult.user is null');
        return;
      }

      AuthStore.setUser(signInResult.user);
      AuthStore.setIsAuthenticated(true);
    };

    if (process.env.EXPO_PUBLIC_USE_AUTH) {
      signIn();
    }
  }, []);
};

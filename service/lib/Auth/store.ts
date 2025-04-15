/**
 * Auth 서비스 스토어
 */

import {create, createStore, useStore} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AUTH_STORAGE_KEYS} from '@service/inbound/Auth/consts';
import {createJSONStorage, devtools, persist} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';

import {merge} from 'es-toolkit';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
/**
 * Auth 상태 인터페이스
 */
export interface AuthStoreState<T> {
  user: T | null;
  token: string | null;
  isAuthenticated: boolean;
}

/**
 * Auth 스토어 액션 인터페이스
 */
export interface AuthStoreActions<T> {
  setUser: (user: T | null) => void;
  setToken: (token: string | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  reset: () => void;
}

/**
 * Auth 스토어 인터페이스
 */
export type AuthStoreI<T> = AuthStoreState<T> & AuthStoreActions<T>;

/**
 * Auth 스토어 초기 상태
 */
const initialState: AuthStoreState<null> = {
  user: null,
  token: null,
  isAuthenticated: false,
};

/**
 * Auth 스토어
 */
export const createAuthStore =
  // @change 유저 타입 변경 필요
  <T = FirebaseAuthTypes.User>() =>
    createStore<AuthStoreI<T>>()(
      devtools(
        persist(
          immer((get, set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            /**
             * 사용자 정보 설정
             */
            setUser: (_user: T | null) => {
              set({user: _user});
            },

            /**
             * 토큰 설정
             */
            setToken: (_token: string | null) => {
              set({token: _token});
            },

            /**
             * 인증 상태 설정
             */
            setIsAuthenticated: (_isAuthenticated: boolean) => set({isAuthenticated: _isAuthenticated}),

            /**
             * 스토어 초기화
             */
            reset: () => {
              set({...initialState});
            },
          })),
          {
            name: 'auth-store',
            storage: createJSONStorage(() => AsyncStorage),
            merge: (persistedState, currentState) => merge(currentState, persistedState),
          },
        ),
      ),
    );

export const AuthStore = createAuthStore();

export const useAuthStore = () => {
  const store = useStore(AuthStore);
  return store;
};

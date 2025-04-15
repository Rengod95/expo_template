import {ProcessEnv} from 'process';
import {QueryKey} from '@tanstack/react-query';
import type {
  UseSuspenseQueryOptions,
  UseMutationOptions,
  UseSuspenseInfiniteQueryOptions,
  InfiniteData,
  UseSuspenseInfiniteQueryResult,
  UseSuspenseQueryResult,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';

type Base64 = string;

declare module '*.png' {
  const value: string;
  export default value;
}

declare module 'process' {
  global {
    namespace NodeJS {
      interface process {
        env: ProcessEnv & {
          // add more environment variables and their types here
        };
      }
    }
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_VARIANT: 'development' | 'staging' | 'production';
      EXPO_PUBLIC_USE_AUTH: 'none' | 'firebase';
      EXPO_PUBLIC_MAIN_SERVER_BASE_URL: string;
      EXPO_PUBLIC_REVENUE_CAT_PUBLIC_API_KEY_IOS: string;
      EXPO_PUBLIC_REVENUE_CAT_PUBLIC_API_KEY_ANDROID: string;
      EXPO_PUBLIC_PRIVACY_POLICY_URL: string;
      EXPO_PUBLIC_SERVICE_POLICY_URL: string;
    }
  }
}

type CommonStatus = 'SUCCESS' | 'FAILED';
type QueryKeyBases = Record<string, <T = unknown>(param: T) => QueryKey>;
type SendingRequestStatus = 'init' | 'processing' | 'failed' | 'success';

interface MutationFn<TPayload = unknown, TResponse = void, TError = Error, StaticKey extends string | readonly string[] = string> {
  (options?: Omit<UseMutationOptions<TResponse, TError, TPayload>, 'mutationFn'>): UseMutationResult<TResponse, TError, TPayload>;
  key: StaticKey;
  fetcher: (payload: TPayload) => Promise<TResponse>;
}

export type SuspenseQueryFn<
  TParams = void,
  RResponse = unknown,
  KeyBinder extends readonly string[] | ((params: TParams) => readonly string[]) = string[],
  Fetcher = TParams extends void ? () => Promise<RResponse> : (params: TParams) => Promise<RResponse>,
> = TParams extends void
  ? {
      (options?: UseSuspenseQueryOptions<RResponse, TError, RResponse, QueryKey>): UseSuspenseQueryResult<RResponse, TError>;
      key: KeyBinder;
      fetcher: Fetcher;
    }
  : {
      (options: {
        params: TParams;
        queryOptions?: Omit<UseSuspenseQueryOptions<RResponse, TError, RResponse, QueryKey>, 'queryFn'>;
      }): UseSuspenseQueryResult<RResponse, TError>;
      key: KeyBinder;
      fetcher: Fetcher;
    };

export type QueryFn<
  TParams = void,
  RResponse = unknown,
  KeyBinder extends readonly string[] | ((params: TParams) => readonly string[]) = string[],
  Fetcher = TParams extends void ? () => Promise<RResponse> : (params: TParams) => Promise<RResponse>,
> = TParams extends void
  ? {
      (options?: UseQueryOptions<RResponse, TError, RResponse, QueryKey>): UseQueryResult<RResponse, TError>;
      key: KeyBinder;
      fetcher: Fetcher;
    }
  : {
      (options: {
        params: TParams;
        queryOptions?: Omit<UseQueryOptions<RResponse, TError, RResponse, QueryKey>, 'queryFn'>;
      }): UseQueryResult<RResponse, TError>;
      key: KeyBinder;
      fetcher: Fetcher;
    };

interface SuspenseInfiniteQueryFn<
  TParams = void,
  RResponse = unknown,
  KeyBinder extends readonly string[] | ((params: TParams) => readonly string[]) = string[],
  Fetcher extends (params: TParams) => Promise<RResponse>,
  TPageParam = number,
> {
  (
    options: TParams extends void
      ? UseSuspenseInfiniteQueryOptions<RResponse, TError, InfiniteData<RResponse, TPageParam>, RResponse, QueryKey, TPageParam>
      : {
          params: TParams;
          queryOptions?: Omit<
            UseSuspenseInfiniteQueryOptions<RResponse, TError, InfiniteData<RResponse, TPageParam>, RResponse, QueryKey, TPageParam>,
            'queryFn'
          >;
        },
  ): UseSuspenseInfiniteQueryResult<InfiniteData<RResponse, TPageParam>, TError>;
  key: KeyBinder;
  fetcher: Fetcher;
}

interface InfiniteQueryFn<
  TParams = void,
  RResponse = unknown,
  KeyBinder extends readonly string[] | ((params: TParams) => readonly string[]) = string[],
  Fetcher extends (params: TParams) => Promise<RResponse>,
  TPageParam = number,
> {
  (options: {
    params: TParams;
    queryOptions?: Omit<UseInfiniteQueryOptions<RResponse, TError, InfiniteData<RResponse, TPageParam>, RResponse, QueryKey, TPageParam>, 'queryFn'>;
  }): UseInfiniteQueryResult<InfiniteData<RResponse, TPageParam>, TError>;
  key: KeyBinder;
  fetcher: Fetcher;
}

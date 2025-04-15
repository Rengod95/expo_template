import { type PermissionResponse } from "expo-modules-core";

export type PermissionRequestHook = () => [
  PermissionResponse | null,
  () => Promise<PermissionResponse>,
  () => Promise<PermissionResponse>
];

export type PermissionViewInterface = {
  name: string;
  descriptionWhy: string;
  hook: PermissionRequestHook;
  icon?: React.ReactNode;
};

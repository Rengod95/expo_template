import Constants from "expo-constants";

export const getBundleId = () => {
  return Constants.expoConfig?.ios?.bundleIdentifier ?? "";
};
export const getVersion = () => {
  return Constants.expoConfig?.version;
};
export default {
  getBundleId,
  getVersion,
};

import * as development from "./development";
import * as production from "./production";
import * as testing from "./testing";
import * as staging from "./staging";
// export const URL_DOWNLOAD_IOS = `https://apps.apple.com/`;
export const URL_DOWNLOAD_IOS = `/`;
// export const URL_DOWNLOAD_ANDROID = `https://play.google.com/`;
export const URL_DOWNLOAD_ANDROID = `/`;
export default {
  development,
  testing,
  staging,
  production
};

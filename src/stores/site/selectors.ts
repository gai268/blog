import { AppState } from "../store";

/**
 * Webサイト名
 */
export const siteNameSelector = (state: AppState) => {
    return state.site.siteName;
};

/**
 * Webサイト説明文
 */
 export const siteDescriptionSelector = (state: AppState) => {
    return state.site.siteDescription;
};


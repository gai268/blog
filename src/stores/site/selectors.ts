import { AppState } from "../store";

/**
 * Webサイト名(meta title)
 */
export const metaTitleSelector = (state: AppState) => {
    return state.site.metaTitle;
};

/**
 * Webサイト説明文(meta description)
 */
 export const metaDescriptionSelector = (state: AppState) => {
    return state.site.metaDescription;
};


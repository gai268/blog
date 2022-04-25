import { AppState } from "../store";

/**
 * ユーザー名
 */
export const userNameSelector = (state: AppState) => {
    return state.user.name;
};

/**
 * ユーザーのアバター画像
 */
 export const userAvatarSelector = (state: AppState) => {
    return state.user.avatar;
};

/**
 * ユーザー説明文
 */
 export const userDiscriptionSelector = (state: AppState) => {
    return state.user.discription;
};

/**
 * ユーザーのリンク一覧
 */
 export const userLinksSelector = (state: AppState) => {
    return state.user.links;
};


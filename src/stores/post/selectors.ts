import { AppState } from "../store";

/**
 * 記事一覧
 */
export const postsSelector = (state: AppState) => {
    return state.post.posts;
};

/**
 * 記事一覧の件数
 */
export const postsCountSelector = (state: AppState) => {
    return state.post.count;
};

/**
 * 現在の記事詳細
 */
 export const currentPostSelector = (state: AppState) => {
    return state.post.posts[Object.keys(state.post.posts)[0]];
};

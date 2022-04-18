import { AppState } from "../store";

/**
 * 記事一覧を取得する
 */
export const postsSelector = (state: AppState) => {
    return state.post.posts;
};

/**
 * 記事一覧の件数を取得する
 */
export const postsCountSelector = (state: AppState) => {
    return state.post.count;
};
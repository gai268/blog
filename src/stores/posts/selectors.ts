import { EntityId } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { postsSelectors } from "./slices";

/**
 * 投稿ID一覧
 */
 export const postsIdsSelector = (state: AppState) => {
    return postsSelectors.selectIds(state.posts)
};

/**
 * 投稿詳細
 */
 export const postBySelector = (state: AppState) => ({id}: {id: EntityId}) => {
    return postsSelectors.selectById(state.posts, id)
};

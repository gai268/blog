import { EntityId } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { linksSelectors } from "./slices";

/**
 * 関連リンクID一覧
 */
 export const linksIdsSelector = (state: AppState) => {
    return linksSelectors.selectIds(state.links)
};

/**
 * 関連リンク
 */
export const linkBySelector = (state: AppState) => ({id}: {id: EntityId}) => {
    return linksSelectors.selectById(state.links, id)
};

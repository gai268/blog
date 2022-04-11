import { AppState } from "../store";
import { EntriesState } from "./types";

const selectSelf = (state: EntriesState) => state;

/**
 * 記事一覧を取得する
 */
export const entriesSelector = (state: AppState) => {
    return state.entry.entries;
};

/**
 * 記事一覧の件数を取得する
 */
export const entriesCountSelector = (state: AppState) => {
    return state.entry.count;
};

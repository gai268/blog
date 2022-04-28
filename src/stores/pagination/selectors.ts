import { AppState } from "../store";

/**
 * 現在のページ番号
 */
 export const currentPageSelector = (state: AppState) => {
    return state.pagination.currentPage;
};
/**
 * 総ページ数
 */
 export const totalPageSelector = (state: AppState) => {
    const totalPage =  Math.ceil((state.pagination.totalCount / state.pagination.maxPostsPerPage) | 1)
    return totalPage;
};

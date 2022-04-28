/**
 * 投稿のページネーション情報
 */
 export type PostsPagination = {

    /**
     * 現在のページ番号
     */
    currentPage: number
    
    /**
     * 総投稿数
     */
    totalCount: number

    /**
     * 1ページあたりの最大投稿表示数
     */
    maxPostsPerPage: number
}

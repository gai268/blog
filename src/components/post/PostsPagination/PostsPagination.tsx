import { Link, Pagination, PaginationItem } from "@mui/material"
import { useAppSelector } from "../../../stores/hooks";
import { currentPageSelector, totalPageSelector } from "../../../stores/pagination/selectors";

export const PostsPagination = () => {
    // 総ページ数
    const totalPage = useAppSelector(totalPageSelector);
    // 現在のページ番号
    const currentPage = useAppSelector(currentPageSelector);
  
    return (
    <Pagination 
        page={currentPage <= totalPage ? currentPage : 0} 
        count={totalPage} shape="rounded"
        renderItem={(item) => (
            <PaginationItem {...item} component={Link}
                href={`/posts${item.page === 1 ? '' : `?page=${item.page}`}`}
            />
        )}
    />)
}
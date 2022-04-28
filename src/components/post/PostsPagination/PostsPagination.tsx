import { Pagination } from "@mui/material"
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
        />)
}
import { Container, Grid, Pagination, Stack } from '@mui/material'
import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import { PostItem } from '../../components/post/PostItem/PostItem'
import { Header } from '../../components/common/Header/Header'
import { postsReceived } from '../../stores/posts/slices'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { Sidebar } from '../../components/common/Sidebar/Sidebar'
import { PostsResponse, SiteResponse } from '../../helpers/apis/cmsApi/types'
import { cmsApi } from '../../helpers/apis/cmsApi'
import { postsIdsSelector } from '../../stores/posts/selectors'
import { userReceived } from '../../stores/user/slices'
import { linksReceived } from '../../stores/links/slices'
import { siteReceived } from '../../stores/site/slices'
import { postsPaginationReceived } from '../../stores/pagination/slices'
import { PostsPagination } from '../../components/post/PostsPagination/PostsPagination'
import { siteNameSelector } from '../../stores/site/selectors'
import { useLayoutEffect } from 'react'

// サーバーサイド処理
type ServerSideProps = { 
  page: number
  postsResponse: PostsResponse
  siteResponse: SiteResponse
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  // 1ページあたりの最大投稿表示数
  const maxPostsPerPage = parseInt(process.env.MAX_POSTS_PER_PAGE || "10")
  // 表示ページ番号(デフォルト値:1)
  const page: number = (() => {
    const queryPage = parseInt(context.query.page as string)
    return (queryPage && queryPage > 0) ? queryPage : 1
  })()
  const offset = maxPostsPerPage * (page - 1)

  // 並列処理
  const [postsResponse, siteResponse] = await Promise.all([
    // 投稿一覧を取得
    cmsApi.fetchPosts({limit: maxPostsPerPage, offset}),
    // サイト情報を取得
    cmsApi.fetchSite()
  ])
  return { props: { page, postsResponse, siteResponse } }
}

const Page = ({page, postsResponse, siteResponse}: ServerSideProps) => {
  const dispatch = useAppDispatch()

  // 初期化処理
  useLayoutEffect(() => {
    // 投稿一覧を読み込む
    dispatch(postsReceived(postsResponse))
    // 投稿一覧のページネーション情報を読み込む
    dispatch(postsPaginationReceived({page, postsResponse}))
    // サイト情報を読み込む
    dispatch(siteReceived(siteResponse))
    // ユーザー情報を読み込む
    dispatch(userReceived(siteResponse))
    // 関連リンク一覧情報を読み込む
    dispatch(linksReceived(siteResponse.links))
  }, [dispatch, page, postsResponse, siteResponse])
  
  const postsIds = useAppSelector(postsIdsSelector);
  const siteName = useAppSelector(siteNameSelector);

  return (
    <div>
      <Head>
        <title>{siteName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <Container maxWidth="xl" component={'main'}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={9}>
            {/* 記事一覧 */}
            {postsIds.map(postId => <PostItem key={postId} postId={postId} />)}
            <Grid container justifyContent={"center"} marginTop={1}>
              <Grid item><PostsPagination/></Grid>   
            </Grid>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Sidebar></Sidebar>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Page

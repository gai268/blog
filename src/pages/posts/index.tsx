import { Container, Grid } from '@mui/material'
import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
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

// サーバーサイド処理
type ServerSideProps = { 
  postsResponse: PostsResponse, 
  siteResponse: SiteResponse
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  // 並列処理
  const [postsResponse, siteResponse] = await Promise.all([
    // 投稿一覧を取得
    cmsApi.fetchPosts(),
    // サイト情報を取得
    cmsApi.fetchSite()
  ])
  return { props: { postsResponse, siteResponse } }
}

const Page = ({postsResponse, siteResponse}: ServerSideProps) => {
  const dispatch = useAppDispatch()

  // 記事一覧
  dispatch(postsReceived(postsResponse))
  // サイト情報を読み込む
  dispatch(siteReceived(siteResponse))
  // ユーザー情報を読み込む
  dispatch(userReceived(siteResponse))
  // 関連リンク一覧情報を読み込む
  dispatch(linksReceived(siteResponse.links))

  const postsIds = useAppSelector(postsIdsSelector);
  useEffect(() => {},[dispatch, postsIds])

  return (
    <div>
      <Head>
        <title>ブログ</title>
        <meta name="description" content="~~についてのブログです。" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <Container maxWidth="xl" component={'main'}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={9}>
            {/* 記事一覧 */}
            {postsIds.map(postId => <PostItem key={postId} postId={postId} />)}        
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

import { Container, Grid } from '@mui/material'
import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { PostItem } from '../../components/post/PostItem/PostItem'
import { Header } from '../../components/common/Header/Header'
import { postsReceived } from '../../stores/posts/slices'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { Sidebar } from '../../components/common/Sidebar/Sidebar'
import { PostsResponse, UserResponse } from '../../helpers/apis/cmsApi/types'
import { cmsApi } from '../../helpers/apis/cmsApi'
import { postsIdsSelector } from '../../stores/posts/selectors'
import { userReceived } from '../../stores/user/slices'
import { linksReceived } from '../../stores/links/slices'

// サーバーサイド処理
type ServerSideProps = { 
  postsResponse: PostsResponse, 
  userResponse: UserResponse
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const [postsResponse, userResponse] = await Promise.all([
    // 投稿一覧を取得
    cmsApi.fetchPosts(),
    // ユーザ情報を取得
    cmsApi.fetchUser()
  ])
  return { props: { postsResponse, userResponse } }
}

const Page = ({postsResponse, userResponse}: ServerSideProps) => {
  const dispatch = useAppDispatch()

  // 記事一覧
  dispatch(postsReceived(postsResponse))
  // ユーザー情報
  dispatch(userReceived(userResponse))
  // 関連リンク一覧情報
  dispatch(linksReceived(userResponse.links))

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

import { Container, Grid } from '@mui/material'
import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { PostItem } from '../../components/post/PostItem/PostItem'
import { Header } from '../../components/common/Header/Header'
import { postsReceived } from '../../stores/posts/slices'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { Sidebar } from '../../components/common/Sidebar/Sidebar'
import { Posts } from '../../helpers/cmsApiClient/types'
import { cmsApiClient } from '../../helpers/cmsApiClient'
import { postsIdsSelector } from '../../stores/posts/selectors'

// サーバーサイド処理
type ServerSideProps = { postsResponse: Posts }
export const getServerSideProps: GetServerSideProps = async (context) => {
  // 投稿一覧を取得
  const postsResponse: Posts = await cmsApiClient.fetchPosts();
  return { props: { postsResponse } }
}

const Page = ({postsResponse}: ServerSideProps) => {
  const dispatch = useAppDispatch();

  // 記事一覧読み込み
  dispatch(postsReceived(postsResponse));

  // const posts = useAppSelector(postsSelector);
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

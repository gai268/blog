import { Container, Grid } from '@mui/material'
import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { Header } from '../../components/common/Header/Header'
import { postReceived } from '../../stores/posts/slices'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { Sidebar } from '../../components/common/Sidebar/Sidebar'
import { PostDetail } from '../../components/post/PostDetail/PostDetail'
import { Post as PostResponse } from '../../helpers/cmsApiClient/types'
import { cmsApiClient } from '../../helpers/cmsApiClient'
import { HttpStatusError } from '../../helpers/cmsApiClient/errors'


// サーバーサイド処理
type ServerSideProps = { postResponse: PostResponse }
export const getServerSideProps: GetServerSideProps = async (context) => {
  const postId = context.params?.postId as string;
  try {
    // 投稿を取得する
    const postResponse: PostResponse = await cmsApiClient.fetchPost(postId);
    return { props: { postResponse } }
  } catch (error) {
    if(error instanceof HttpStatusError){
      // 404ページを表示
      if(error.statusCode === 404) return {notFound: true}
    }
    throw error;
  }
}

const Page = ({postResponse}: ServerSideProps) => {
  const dispatch = useAppDispatch();

  // 記事の読み込み
  dispatch(postReceived(postResponse));

  const postId = postResponse.id

  useEffect(() => {},[dispatch])

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
            {/* 記事 */}
            <PostDetail postId={postId}></PostDetail>
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

import { Container, Grid } from '@mui/material'
import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { Header } from '../../components/common/Header/Header'
import { readPost } from '../../stores/post/slices'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { Sidebar } from '../../components/common/Sidebar/Sidebar'
import { PostResponse } from '../api/posts/[postId]'
import { PostDetail } from '../../components/post/PostDetail/PostDetail'
import { currentPostSelector } from '../../stores/post/selectors'
import { Post } from '../../stores/post/types'


// サーバーサイド処理
type ServerSideProps = { postResponse: PostResponse }
export const getServerSideProps: GetServerSideProps = async (context) => {
  const postId = context.params?.postId;

  // Fetch data from external API
  const res: Response = await fetch(`http://localhost:3000/api/posts/${postId}`) // TODO: サンプル用
  const postResponse: PostResponse = await res.json();

  // Pass data to the page via props
  return { props: { postResponse } }
}

const Page = ({postResponse}: ServerSideProps) => {
  const dispatch = useAppDispatch();

  // 記事の読み込み
  dispatch(readPost(postResponse));
  const currentPost: Post = useAppSelector(currentPostSelector);

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
            <PostDetail postId={currentPost.id} post={currentPost}></PostDetail>
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

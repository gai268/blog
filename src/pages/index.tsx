import { Container, Grid } from '@mui/material'
import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { PostList } from '../components/post/PostList/PostList'
import { Header } from '../components/common/Header/Header'
import { postsCountSelector } from '../stores/post/selectors'
import { fetchPosts } from '../stores/post/slices'
import { useAppDispatch, useAppSelector } from '../stores/hooks'
import { Sidebar } from '../components/common/Sidebar/Sidebar'
import { PostsResponse } from './api/posts'


// サーバーサイド処理
type ServerSideProps = { postsResponse: PostsResponse }
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API
  const res: Response = await fetch(`http://localhost:3000/api/posts`) // TODO: サンプル用
  const postsResponse: PostsResponse = await res.json();

  // Pass data to the page via props
  return { props: { postsResponse: postsResponse } }
}

const Home = ({postsResponse: postsResponse}: ServerSideProps) => {
  const dispatch = useAppDispatch();
  const articlesCount = useAppSelector(postsCountSelector);

  useEffect(() => {
    // 記事一覧読み込み
    dispatch(fetchPosts(postsResponse));
  },[dispatch, postsResponse])

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
            <p>件数：{articlesCount}</p>
            {/* 記事一覧 */}
            <PostList></PostList>          
          </Grid>
          <Grid item xs={12} sm={3}>
            <Sidebar></Sidebar>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Home

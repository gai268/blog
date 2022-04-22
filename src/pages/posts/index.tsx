import { Container, Grid } from '@mui/material'
import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { PostList } from '../../components/post/PostList/PostList'
import { Header } from '../../components/common/Header/Header'
import { postsTotalCountSelector } from '../../stores/post/selectors'
import { readPosts } from '../../stores/post/slices'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { Sidebar } from '../../components/common/Sidebar/Sidebar'
import { Posts } from '../../helpers/cmsApi/types'

// サーバーサイド処理
type ServerSideProps = { postsResponse: Posts }
export const getServerSideProps: GetServerSideProps = async (context) => {
  // 記事一覧を取得
  const headers = new Headers()
  headers.set(process.env.CMS_API_KEY_HEADER_NAME || "", process.env.CMS_API_KEY_HEADER_VALUE || "")
  const res: Response = await fetch(`${process.env.CMS_API_ENDPOINT}/posts`, {headers})
  if(!res.ok) {
      throw new Error(`status: ${res.status}, body: ${(await res.text()).toString()}`)
  }
  const postsResponse: Posts = await res.json();

  // Pass data to the page via props
  return { props: { postsResponse } }
}

const Page = ({postsResponse}: ServerSideProps) => {
  const dispatch = useAppDispatch();

  // 記事一覧読み込み
  dispatch(readPosts(postsResponse));
  // 記事数
  const totalCount = useAppSelector(postsTotalCountSelector);

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
            <p>全件数：{totalCount}</p>
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

export default Page

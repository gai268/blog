import { Container, Grid } from '@mui/material'
import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { Header } from '../../components/common/Header/Header'
import { readPost } from '../../stores/post/slices'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { Sidebar } from '../../components/common/Sidebar/Sidebar'
import { PostDetail } from '../../components/post/PostDetail/PostDetail'
import { currentPostSelector } from '../../stores/post/selectors'
import { PostState } from '../../stores/post/types'
import { Post } from '../../helpers/cmsApi/types'


// サーバーサイド処理
type ServerSideProps = { postResponse: Post }
export const getServerSideProps: GetServerSideProps = async (context) => {
  const postId = context.params?.postId as string;

  // 記事詳細を取得
  const headers = new Headers()
  headers.set(process.env.CMS_API_KEY_HEADER_NAME || "", process.env.CMS_API_KEY_HEADER_VALUE || "")
  const res: Response = await fetch(`${process.env.CMS_API_ENDPOINT}/posts/${postId}`, {headers})
  if(!res.ok) {
    // 404ページを表示
    if(res.status === 404) return {notFound: true}
    throw new Error(`status: ${res.status}, body: ${(await res.text()).toString()}`)
  }
  const postResponse: Post = await res.json();
  return { props: { postResponse } }
}

const Page = ({postResponse}: ServerSideProps) => {
  const dispatch = useAppDispatch();

  // 記事の読み込み
  dispatch(readPost(postResponse));
  const currentPost: PostState = useAppSelector(currentPostSelector);

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

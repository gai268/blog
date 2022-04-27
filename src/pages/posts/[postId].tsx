import { Container, Grid } from '@mui/material'
import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { Header } from '../../components/common/Header/Header'
import { postReceived } from '../../stores/posts/slices'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { Sidebar } from '../../components/common/Sidebar/Sidebar'
import { PostDetail } from '../../components/post/PostDetail/PostDetail'
import { PostResponse as PostResponse, UserResponse } from '../../helpers/apis/cmsApi/types'
import { cmsApi } from '../../helpers/apis/cmsApi'
import { AxiosError } from 'axios'
import { userReceived } from '../../stores/user/slices'
import { linksReceived } from '../../stores/links/slices'


// サーバーサイド処理
type ServerSideProps = { 
  postResponse: PostResponse,
  userResponse: UserResponse
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const postId = context.params?.postId as string;
  try {
    const [postResponse, userResponse] = await Promise.all([
      // 投稿を取得
      cmsApi.fetchPost(postId),
      // ユーザ情報を取得
      cmsApi.fetchUser()
    ])
    return { props: { postResponse, userResponse } }
  } catch (e) {
    if(e instanceof AxiosError && e.isAxiosError){
      // 404ページを表示
      if(e.response?.status === 404) return {notFound: true}
    }
    throw e;
  }
}

const Page = ({postResponse, userResponse}: ServerSideProps) => {
  const dispatch = useAppDispatch();

  // 記事の読み込み
  dispatch(postReceived(postResponse));
  // ユーザー情報
  dispatch(userReceived(userResponse))
  // 関連リンク一覧情報
  dispatch(linksReceived(userResponse.links))
  

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

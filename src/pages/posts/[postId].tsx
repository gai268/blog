import { Container, Grid } from '@mui/material'
import type { GetServerSideProps, GetServerSidePropsResult } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { Header } from '../../components/common/Header/Header'
import { postReceived } from '../../stores/posts/slices'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { Sidebar } from '../../components/common/Sidebar/Sidebar'
import { PostDetail } from '../../components/post/PostDetail/PostDetail'
import { PostResponse as PostResponse, SiteResponse } from '../../helpers/apis/cmsApi/types'
import { cmsApi } from '../../helpers/apis/cmsApi'
import { AxiosError } from 'axios'
import { userReceived } from '../../stores/user/slices'
import { linksReceived } from '../../stores/links/slices'
import { siteReceived } from '../../stores/site/slices'


// サーバーサイド処理
type ServerSideProps = { 
  postResponse: PostResponse,
  siteResponse: SiteResponse
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const postId = context.params?.postId as string;
  // 並列処理
  const [postResponse, siteResponse] = await Promise.all([
    // 投稿を取得
    cmsApi.fetchPost(postId).catch(e => {
      if(e instanceof AxiosError && e.isAxiosError){
        // 存在しない投稿IDであった場合
        if(e.response?.status === 404) return null
      }
      throw e
    }),
    // サイト情報を取得
    cmsApi.fetchSite()
  ])
  // 記事が存在しないので404ページを表示
  if(!postResponse) return {notFound: true}
  return { props: { postResponse, siteResponse } }
}

const Page = ({postResponse, siteResponse}: ServerSideProps) => {
  const dispatch = useAppDispatch();

  // 記事の読み込み
  dispatch(postReceived(postResponse));
  // サイト情報を読み込む
  dispatch(siteReceived(siteResponse))
  // ユーザー情報
  dispatch(userReceived(siteResponse))
  // 関連リンク一覧情報
  dispatch(linksReceived(siteResponse.links))

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

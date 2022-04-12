import { Avatar, Card, CardContent, Container, Grid, Typography } from '@mui/material'
import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import EntryList from '../components/entry/EntryList/EntryList'
import Header from '../components/common/Header/Header'
import { entriesCountSelector } from '../stores/entry/selectors'
import { fetchEntries } from '../stores/entry/slices'
import { useAppDispatch, useAppSelector } from '../stores/hooks'
import { EntriesEntity } from '../entities/api/EntriesEntity'


// サーバーサイド処理
type ServerSideProps = { entriesEntity: EntriesEntity }
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API
  const res: Response = await fetch(`http://localhost:3000/api/posts`) // TODO: サンプル用
  const entriesEntity: EntriesEntity = await res.json();

  // Pass data to the page via props
  return { props: { entriesEntity } }
}

const Home = ({entriesEntity}: ServerSideProps) => {
  const dispatch = useAppDispatch();
  const articlesCount = useAppSelector(entriesCountSelector);

  useEffect(() => {
    // 記事一覧読み込み
    dispatch(fetchEntries(entriesEntity));
  },[dispatch, entriesEntity])

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
            <EntryList></EntryList>          
          </Grid>
          <Grid item xs={12} sm={3}>
            <Card elevation={0}>
            <CardContent>
              <Typography gutterBottom variant="subtitle1" component="div">
              Profile
              </Typography>
              <Grid container spacing={2}>
                <Grid item><Avatar src="/avatar.jpg" /></Grid>
                <Grid item xs={9}>
                  <Typography variant="subtitle2">
                  ユーザー名
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  こんにちは。ここには説明文が入ります。
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>            
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Home

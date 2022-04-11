import { Avatar, Card, CardContent, Container, Grid, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import EntryList from '../components/entry/EntryList/EntryList'
import Header from '../components/common/Header/Header'
import { entriesCountSelector } from '../stores/entry/selectors'
import { fetchArticles } from '../stores/entry/slices'
import { useAppDispatch, useAppSelector } from '../stores/hooks'

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const articlesCount = useAppSelector(entriesCountSelector);

  useEffect(() => {
    dispatch(fetchArticles([]));
  },[dispatch])

  
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

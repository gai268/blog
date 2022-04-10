import { Avatar, Card, CardContent, Container, Grid, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import ArticleList from '../components/article/ArticleList/ArticleList'
import Header from '../components/common/Header/Header'

const Home: NextPage = () => {
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
            <ArticleList></ArticleList>          
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

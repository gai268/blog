import { Container, Grid } from '@mui/material'
import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { EntryList } from '../components/entry/EntryList/EntryList'
import { Header } from '../components/common/Header/Header'
import { entriesCountSelector } from '../stores/entry/selectors'
import { fetchEntries } from '../stores/entry/slices'
import { useAppDispatch, useAppSelector } from '../stores/hooks'
import { Sidebar } from '../components/common/Sidebar/Sidebar'
import { EntriesResponse } from './api/entries'


// サーバーサイド処理
type ServerSideProps = { entriesResponse: EntriesResponse }
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API
  const res: Response = await fetch(`http://localhost:3000/api/entries`) // TODO: サンプル用
  const entriesResponse: EntriesResponse = await res.json();

  // Pass data to the page via props
  return { props: { entriesResponse } }
}

const Home = ({entriesResponse}: ServerSideProps) => {
  const dispatch = useAppDispatch();
  const articlesCount = useAppSelector(entriesCountSelector);

  useEffect(() => {
    // 記事一覧読み込み
    dispatch(fetchEntries(entriesResponse));
  },[dispatch, entriesResponse])

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
            <Sidebar></Sidebar>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Home

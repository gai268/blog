import { Container, Grid } from '@mui/material'
import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { PostList } from '../components/post/PostList/PostList'
import { Header } from '../components/common/Header/Header'
import { postsCountSelector } from '../stores/post/selectors'
import { setPosts } from '../stores/post/slices'
import { useAppDispatch, useAppSelector } from '../stores/hooks'
import { Sidebar } from '../components/common/Sidebar/Sidebar'
import { PostsResponse } from './api/posts'


// サーバーサイド処理
type ServerSideProps = { postsResponse: PostsResponse }
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: {
      permanent: false, // 永続的なリダイレクトかどうか
      destination: '/posts', // リダイレクト先
    }
  }
}

const Page = ({postsResponse: postsResponse}: ServerSideProps) => {}
export default Page

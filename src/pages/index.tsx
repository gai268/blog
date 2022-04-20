import type { GetServerSideProps } from 'next'
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

import type { GetServerSideProps } from 'next'

// サーバーサイド処理
type ServerSideProps = { }
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: {
      permanent: false, // 永続的なリダイレクトかどうか
      destination: '/posts', // リダイレクト先
    }
  }
}

const Page = ({}: ServerSideProps) => {}
export default Page

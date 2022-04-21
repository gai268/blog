// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export type PostResponse = {
  id: string,
  title: string,
  body: string,
  createAt: string
}
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostResponse>
) {
  // TODO: dummy
  const data: PostResponse = {
    id: "UkLwI5aowP",
    title: "dummyタイトル",
    createAt: "2021-05-21T14:00:00+09:00",
    body: "吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。"
  }
  res.status(200).json(data)
}
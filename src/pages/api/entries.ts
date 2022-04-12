// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export type EntriesResponse = {
  count: number,
  entries: Entry[]
}
type Entry = {
  id: string,
  title: string,
  body: string,
  createAt: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<EntriesResponse>
) {
    // TODO: dummy
    const data: EntriesResponse = {
      count: 3,
      entries: [
        {
            id: "UkLwI5aowP",
            title: "タイトル3",
            createAt: "2021-05-21T14:00:00+09:00",
            body: "吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。"
        },{
            id: "cxbDLKeG1R",
            title: "タイトル2",
            createAt: "2021-05-20T14:00:00+09:00",
            body: "ただ彼の掌に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。掌の上で少し落ちついて書生の顔を見たのがいわゆる人間というものの見始であろう。この時妙なものだと思った感じが今でも残っている。第一毛をもって装飾されべきはずの顔がつるつるしてまるで薬缶だ。その後猫にもだいぶ逢ったがこんな片輪には一度も出会わした事がない。のみならず顔の真中があまりに突起している。そうしてその穴の中から時々ぷうぷうと煙を吹く。"
        },{
            id: "6J3luPb4HH",
            title: "タイトル1",
            createAt: "2021-05-19T14:00:00+09:00",
            body: "どうも咽せぽくて実に弱った。これが人間の飲む煙草というものである事はようやくこの頃知った。吾輩は猫である。名前はまだ無い。どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。ただ彼の掌に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。"
        },
      ]
    } 
    res.status(200).json(data)
}
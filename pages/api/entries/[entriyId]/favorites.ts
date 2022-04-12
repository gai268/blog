// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    // TODO: dummy
    res.status(200).json({ message: 'OK' })
  } else {
    // Handle any other HTTP method
    res.status(405).json({ message: '405 Method Not Allowed' })
  }
}
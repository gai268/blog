// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type FavoritesResponse = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<FavoritesResponse>
) {
  if (req.method === 'POST') {
    // TODO: dummy
    res.status(200).json({ message: 'OK' })
  } else {
    // Handle any other HTTP method
    res.status(405).json({ message: '405 Method Not Allowed' })
  }
}
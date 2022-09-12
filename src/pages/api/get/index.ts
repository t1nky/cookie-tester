import { getCookies } from 'cookies-next';
import { TmpCookiesObj } from 'cookies-next/lib/types';
import { NextApiResponse, NextApiRequest } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TmpCookiesObj>
) {
  const cookies = getCookies({ req, res });
  return res.status(200).json({ ...cookies });
}

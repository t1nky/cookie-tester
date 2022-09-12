import { getCookies, removeCookies } from 'cookies-next';
import { TmpCookiesObj } from 'cookies-next/lib/types';
import { NextApiResponse, NextApiRequest } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TmpCookiesObj>
) {
  const cookies = getCookies({ req, res });
  if (cookies) {
    Object.keys(cookies).forEach((cookie) => {
      removeCookies(cookie, { req, res });
    });
  }
  return res.status(200).end();
}

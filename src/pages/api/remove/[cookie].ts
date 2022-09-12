import { CookieValueTypes, removeCookies } from 'cookies-next';
import { NextApiResponse, NextApiRequest } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ [key: string]: CookieValueTypes }>
) {
  const { cookie } = req.query;
  if (typeof cookie !== 'string') {
    return res.status(400).end();
  }
  removeCookies(cookie, { req, res });
  return res.status(200).end();
}

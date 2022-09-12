import { CookieValueTypes, setCookie } from 'cookies-next';
import { NextApiResponse, NextApiRequest } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ [key: string]: CookieValueTypes }>
) {
  const { cookie } = req.query;
  if (!Array.isArray(cookie) || cookie.length < 2) {
    return res.status(400).end();
  }
  const [key, value] = cookie;
  if (key === undefined || value === undefined) {
    return res.status(400).end();
  }
  setCookie(key, value, { req, res, maxAge: 60 * 6 * 24 });
  return res.status(200).end();
}

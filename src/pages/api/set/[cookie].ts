import { CookieValueTypes, setCookie } from 'cookies-next';
import { NextApiResponse, NextApiRequest } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ [key: string]: CookieValueTypes }>
) {
  const { cookie, value } = req.query;
  if (typeof cookie !== 'string') {
    return res.status(400).end();
  }
  if (cookie === undefined || value === undefined) {
    return res.status(400).end();
  }
  setCookie(cookie, value, { req, res, maxAge: 60 * 6 * 24 });
  return res.status(200).end();
}

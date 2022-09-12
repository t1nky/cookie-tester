import { CookieValueTypes, setCookie } from 'cookies-next';
import { NextApiResponse, NextApiRequest } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ [key: string]: CookieValueTypes }>
) {
  setCookie('test', 'value', { req, res, maxAge: 60 * 6 * 24 });
  return res.status(200).end();
}

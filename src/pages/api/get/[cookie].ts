import { CookieValueTypes, getCookie } from 'cookies-next';
import { NextApiResponse, NextApiRequest } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ [key: string]: CookieValueTypes }>
) {
  const { cookie } = req.query;
  if (typeof cookie !== 'string') {
    return res.status(400).end();
  }
  const cookieValue = getCookie(cookie, { req, res });
  if (cookieValue == null) {
    return res.status(404).end();
  }
  return res.status(200).json({ [cookie]: cookieValue });
}

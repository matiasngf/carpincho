import { Request, Response } from 'carpincho';

export const GET = (req: Request, res: Response) => {
  res.send('Hello World!');
};
import { Request, Response } from 'carpincho'

interface Params {
  userId: string
}

export const GET = (req: Request<Params>, res: Response) => {
  req.params;
  res.json(req.params);
};
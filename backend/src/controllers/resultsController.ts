// @ts-nocheck

import ResultRepository from '../repositories/result';

class restulsController {
  static async registerResult(req: Request, res: Response) {
    const { userId, time, wpm } = req.body;
    try {
      await ResultRepository.registerResult({ userId, time, wpm });

      return res.status(201).json('Result saved');
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }
}
export default restulsController;

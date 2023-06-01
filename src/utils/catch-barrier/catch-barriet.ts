import { NextFunction, Request, Response } from 'express'

export const useControllerWithCatchBarrier = (controller: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => { Promise.resolve(controller(req, res, next)).catch(next) }

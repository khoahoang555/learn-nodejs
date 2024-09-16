import { Request, NextFunction, Response, RequestHandler } from 'express'

export const wrapRequestHandler = (func: RequestHandler) => {
  return async (req: Request, resp: Response, next: NextFunction) => {
    try {
      await func(req, resp, next)
    } catch (error) {
      next(error)
    }
  }
}

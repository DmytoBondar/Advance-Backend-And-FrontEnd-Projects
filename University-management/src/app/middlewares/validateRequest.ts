import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodEffects } from 'zod';
const validationRequest = (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
                cookies: req.cookies,
            })
        } catch (error) {
            next(error)
        }
    }
export default validationRequest; 
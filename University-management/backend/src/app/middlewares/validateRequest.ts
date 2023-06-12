import { AnyZodObject, ZodEffects } from 'zod';
import { NextFunction, Request, Response } from 'express';
const validationRequest = (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{
            await schema.parseAsync({
                body: req.body,
                params: req.params,
                query: req.query,
                cookies: req.cookies
            })
        }catch(err){
            return next(err)
        }
    }
export default validationRequest;
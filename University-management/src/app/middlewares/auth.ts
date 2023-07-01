import { NextFunction, Request, Response } from "express";
import ApiError from "../../errors/ApiErrors";
import { JWTHelpers } from "../../helpers/jwtHelpers";
import config from "../../config";
import { Secret } from "jsonwebtoken";

const auth = (...authRules: string[]) => 
async(req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
        if(!token){
            throw new ApiError(403, "You are not authorized!!");
        }
        let verifiedUser = null;

        verifiedUser = await JWTHelpers.verifyToken(token, config.secret as Secret);

        req.user = verifiedUser;

        if(authRules.length && !authRules.includes(verifiedUser.role)){
            throw new ApiError(404, "not authorized please login!!");
        }
        next();
    } catch (error) {
        next(error);
        
    }
}
export default auth;
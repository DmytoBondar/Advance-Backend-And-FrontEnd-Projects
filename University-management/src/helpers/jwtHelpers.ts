import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const createAccessToken = (
    payload: Record<string, unknown>,
    secret: Secret,
    expiresTime: string
): string => {
    return jwt.sign(payload, secret, {
        expiresIn: expiresTime
    })
}

const verifyToken = (token: string, secret: Secret): JwtPayload => {
    return jwt.verify(token, secret) as JwtPayload;
};
export const JWTHelpers = {
    createAccessToken,
    verifyToken
}
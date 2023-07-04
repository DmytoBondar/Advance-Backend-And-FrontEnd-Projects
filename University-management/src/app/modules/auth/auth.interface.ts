import { ENUM_USER_ROLE } from "../../../enums/user";

export type ILoggedInUser = {
    id: string;
    password: string;
}

export type ILoginResponse = {
    accessToken: string;
    refreshToken?: string;
    needsPasswordChange: boolean;
}

export type IRefreshTokenResponse = {
    refreshToken: string;
}

export type IVerifiedLoginUser = {
    userId: string;
    role: ENUM_USER_ROLE
}
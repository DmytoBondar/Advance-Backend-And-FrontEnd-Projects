import { JWTHelpers } from './../../../helpers/jwtHelpers';
import { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiErrors";
import { User } from "../users/users.model";
import { ILoggedInUser, ILoginResponse, IPassword, IRefreshTokenResponse } from "./auth.interface"

const loginUser = async (payload: ILoggedInUser): Promise<ILoginResponse> => {
    const { id, password } = payload;

    const isUserExist = await User.isUserExist(id);
    if (!isUserExist) {
        throw new ApiError(403, 'User does not exist');
    }
    if (isUserExist.password && !(await User.isPasswordMatched(password, isUserExist.password))) {
        throw new ApiError(403, 'Password is not matched !!');
    }
    const { id: userId, role, needsPasswordChange } = isUserExist;
    const accessToken = JWTHelpers.createAccessToken(
        { userId, role },
        config.secret as Secret,
        config.expiresIn as string
    )
    const refreshToken = JWTHelpers.createAccessToken(
        { userId, role },
        config.secret as Secret,
        config.expiresIn as string
    )

    return {
        accessToken,
        refreshToken,
        needsPasswordChange
    }
}

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
    let verifiedToken = null;
    try {
        verifiedToken = JWTHelpers.verifyToken(
            token,
            config.refreshSecret as Secret
        );
    } catch (err) {
        throw new ApiError(403, 'Invalid Refresh Token');
    }
    const { userId } = verifiedToken;
    const isUserExist = await User.isUserExist(userId);
    if (!isUserExist) {
        throw new ApiError(403, 'User does not exist');
    }
    const newRefreshToken = JWTHelpers.createAccessToken(
        {
            userId: isUserExist.id,
            role: isUserExist.role,
        },
        config.refreshSecret as Secret,
        config.expiresIn as string
    );

    return {
        refreshToken: newRefreshToken,
    };
};

const updatePassword = async(user: JwtPayload | null,passwordInfo: IPassword) => {
    const {oldPassword, changePassword} = passwordInfo;

    const isUserExist = await User.findOne({id: user?.userId}).select('+password');

    if(!isUserExist){
        throw new ApiError(404, "User is not Found");
    }

    if(isUserExist.password && !(await User.isPasswordMatched(oldPassword,isUserExist.password))){
        throw new ApiError(404, "Password is not matched !!");
    }

    isUserExist.password = changePassword;
    isUserExist.needsPasswordChange = false;

    isUserExist.save();

}
export const AuthService = {
    loginUser,
    refreshToken,
    updatePassword
}
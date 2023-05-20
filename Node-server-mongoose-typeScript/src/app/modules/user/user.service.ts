import { IUser } from "./user.interface";
import User from "./user.model";

export const createUserToDB = async (payload: IUser): Promise<IUser> => {
    const user = new User(payload);
    await user.save();
    return user;
}

export const getUserFromDB = async (): Promise<IUser[]> => {
    const user = await User.find();
    return user;
}

export const getUserByIdFromDB = async(payload:string):Promise<IUser | null> =>{
    console.log(payload)
    const user = await User.findOne({_id:payload});
    return user;
}
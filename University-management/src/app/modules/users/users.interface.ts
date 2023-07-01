import { Model, Types } from "mongoose";
import { IStudent } from "../student/student.interface";
import { IAdmin } from "../admin/admin.interface";
import { IFacultiesUser } from "../facultiesUser/faculties.interface";

export type IUser = {
  id: string;
  role: string;
  password: string;
  needsPasswordChange: boolean;
  student?: Types.ObjectId | IStudent;
  admin?: Types.ObjectId | IAdmin;
  faculty?: Types.ObjectId | IFacultiesUser
}


export type UserModel = {
  isUserExist(
    id: string
  ): Promise<Pick<IUser, 'id' | 'password' | 'role' | 'needsPasswordChange'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
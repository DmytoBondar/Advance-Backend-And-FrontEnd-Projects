import { Model, Types } from "mongoose";
import { IStudent } from "../student/student.interface";
import { IAdmin } from "../admin/admin.interface";
import { IFacultiesUser } from "../facultiesUser/faculties.interface";

export type IUser = {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  admin?: Types.ObjectId | IAdmin;
  faculty?: Types.ObjectId | IFacultiesUser
}
export type UserModel = Model<IUser, Record<string, unknown>>;
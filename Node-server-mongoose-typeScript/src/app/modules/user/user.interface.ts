import { HydratedArraySubdocument, Model } from "mongoose";

//User interface
export interface IUser {
    id: string;
    role: 'student';
    password: string;
    name: {
        firstName: string;
        middleName?: string;
        lastName: string;
    }
    dateOfBirth?: string;
    genger: 'male'| "female";
    email?: string;
    contactNo: number;
    emergencyContactNo: number;
    presentAddress: string;
    permanentAddress: string;
}

//instance
export interface IUserMethods{
    fullName(): string;
}

//model interface
export interface UserModel extends Model<IUser, {}, IUserMethods>{
    getAdminUsers(): Promise<HydratedArraySubdocument<IUser, IUserMethods>>;
}
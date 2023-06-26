import { Model } from "mongoose";

export type UserName = {
    firstName: string;
    lastName: string;
    middleName?: string;
}
export type IBloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export type IAdmin = {
    id: string;
    name: UserName;
    gender: 'male' | 'female';
    dateOfBirth: string;
    email: string;
    contactNo: String;
    emergencyContactNo?: String;
    bloodGroup?: IBloodGroup;
    presentAddress: string;
    permanentAddress?: string;
    profileImage?: string;
}
export type IAdminModel = Model<IAdmin, Record<string, unknown>>;
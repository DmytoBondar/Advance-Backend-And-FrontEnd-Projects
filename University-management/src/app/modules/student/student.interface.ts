import { Model, Types } from "mongoose";
import { IfacultyScemaModel } from "../faculty/faculty.interface";
import { IAcadamicDepartment } from "../acadamicDepartment/academicDepartment.interface";
import { IAcademicSemester } from "../acadamicSemester/acadamicSemester.interface";

export type UserName = {
    firstName: string;
    lastName: string;
    middleName?: string;
}
type IGurdian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: String;
    motherName: string;
    motherOccupation: string;
    motherContactNo: String;
    address: string;
}
type ILocalGurdian = {
    name: string;
    contactNo: String;
    occupation: string;
}
export type IBloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export type IStudent = {
    id: string;
    name: UserName;
    gender: 'male'| 'female';
    dateOfBirth: string;
    email: string;
    contactNo: String;
    emergencyContactNo?: String;
    bloodGroup?: IBloodGroup;
    presentAddress: string;
    permanentAddress?: string;
    guardian ?: IGurdian;
    localGuardian: ILocalGurdian;
    academicFaculty: Types.ObjectId | IfacultyScemaModel;
    academicDepartment: Types.ObjectId | IAcadamicDepartment;
    academicSemester: Types.ObjectId | IAcademicSemester;
    profileImage?: string;
}
export type IStudentModel = Model<IStudent, Record<string, unknown>>;

export type IStudentFilter = {
    searchTerm?: string;
    id?: string;
    blood?: string;
    email?: string;
    contactNo?: string;
}
import { Model, Types } from "mongoose";
import { IFaculty } from "../faculty/faculty.interface";

export type IAcadamicDepartment = {
    title:string;
    acadamicFaculty?: Types.ObjectId | IFaculty;
    faculty?: Types.ObjectId | IFaculty; 
}

export type IAcademicDepartmentModel = Model<IAcadamicDepartment,Record<string,unknown>>


export type IAcademicDepartmentFilters = {
    searchTerm?: string;
    academicFaculty?: Types.ObjectId;
  };

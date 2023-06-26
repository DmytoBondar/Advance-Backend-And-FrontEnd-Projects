import { Model } from "mongoose";

export type IAcademicSemesteTitle = 'Autumn' | 'Fall' | 'Summer';
export type IAcademicSemesterCode = '01' | '02' | '03';

export type IAcademicSemesterMonths =
    | 'January'
    | 'February'
    | 'March'
    | 'April'
    | 'May'
    | 'June'
    | 'July'
    | 'August'
    | 'September'
    | 'October'
    | 'November'
    | 'December';

export type IAcademicSemester = {
    title: IAcademicSemesteTitle,
    code: IAcademicSemesterCode,
    year: string,
    startMonth: IAcademicSemesterMonths;
    endMonth: IAcademicSemesterMonths;
}

export type IAcademicSemesterModel = Model<IAcademicSemester>
export type ISearchInterface = {
    search?: string;
}
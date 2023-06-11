import { IAcademicSemesterTitle, IAcademicSemesterMonths } from "./academicSemester.inteface";

export const academicSemesterTitles: IAcademicSemesterTitle[] = ['Autumn', 'Summer', 'Fall']
export const academicSemesterMonths: IAcademicSemesterMonths[] = ['January'
    , 'February'
    , 'March'
    , 'April'
    , 'May'
    , 'June'
    , 'July'
    , 'August'
    , 'September'
    , 'October'
    , 'November']


export const academicSemesterTitleCodeMapper: {
    [key: string]: string;
} = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
}
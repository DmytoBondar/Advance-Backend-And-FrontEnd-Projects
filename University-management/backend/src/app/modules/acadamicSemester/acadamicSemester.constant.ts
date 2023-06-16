import { IAcademicSemesteTitle, IAcademicSemesterCode, IAcademicSemesterMonths } from "./acadamicSemester.interface"

export const academicSemesterTitles: IAcademicSemesteTitle[] = ['Autumn', 'Fall', 'Summer']
export const academicSemesterCode: IAcademicSemesterCode[] = ['01', '02', '03']

export const academicStartMonth: IAcademicSemesterMonths[] = [
    'January'
    , 'February'
    , 'March'
    , 'April'
    , 'May'
    , 'June'
    , 'July'
    , 'August'
    , 'September'
    , 'October'
    , 'November'
    , 'December'
]

export const AcademicSemesterMapper: { [key: string]: string } = {
    Autumn: '01',
    Fall: '02',
    Summer: '03',
}
export const searchTermsOptions = ['search', 'title', 'code', 'year']
export const searchableFieldsList = ['title', 'code', 'year']
export type IfacultyScemaModel = {
    title: string;
}
export type IFaculty = {
    title: string;
}
export type IGenericResponse<T> = {
    data: T,
    meta: {
        page: number,
        limit: number,
        total: number
    }
}
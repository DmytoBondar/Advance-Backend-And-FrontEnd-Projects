import ApiError from "../../../errors/ApiErrors";
import { AcademicSemesterMapper } from "./acadamicSemester.constant";
import { IAcademicSemester } from "./acadamicSemester.interface";
import { AcademicSemester } from "./acadamicSemester.model";

const createSemester = (payload: IAcademicSemester): Promise<IAcademicSemester> => {

    if (AcademicSemesterMapper[payload.title] !== payload.code) {
        throw new ApiError(409, "Could'nt mistach title and code!")
    }
    const result = AcademicSemester.create(payload);
    return result;
}

const getAllAcademicSemester = (): Promise<IAcademicSemester[]> => {
    const result = AcademicSemester.find();
    return result;
}
const getByIdAcademicSemester = (id:string): Promise<IAcademicSemester | null> => {
    const result = AcademicSemester.findById(id);
    return result;
}

const deleteAcademicSemester = (id:string): Promise<IAcademicSemester | null> => {
    const result = AcademicSemester.findByIdAndDelete(id);
    return result;
}

const updateAcademicSemester =(id: string, payload: Partial<IAcademicSemester>): Promise<IAcademicSemester | null> => {

    if (
        payload.title && payload.code &&
        AcademicSemesterMapper[payload.title] !== payload.code) {
        throw new ApiError(409, "Could'nt mistach title and code!")
    }
    const result = AcademicSemester.findOneAndUpdate({_id: id}, payload, {new : true})
    return result;
}
export const AcademicService = {
    createSemester,
    getAllAcademicSemester,
    getByIdAcademicSemester,
    deleteAcademicSemester,
    updateAcademicSemester
    
}
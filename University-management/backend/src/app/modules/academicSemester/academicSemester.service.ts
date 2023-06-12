import ApiError from "../../../errors/ApiErrors";
import { academicSemesterTitleCodeMapper } from "./academicSemester.constants";
import { IAcademicSemester } from "./academicSemester.inteface"
import { academicSemester } from "./academicSemester.model"


//create Semester
const createSemester = async (payload: IAcademicSemester): Promise<IAcademicSemester> => {
    if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
        throw new ApiError(409, "Invalid Semeser Code !");
    }
    const result = await academicSemester.create(payload);
    return result;
}
// Get All Semester
const getAllSemester = async (): Promise<IAcademicSemester[]> => {
    const result = await academicSemester.find();
    return result;
}

export const AcademicSemesterService = {
    createSemester,
    getAllSemester
}
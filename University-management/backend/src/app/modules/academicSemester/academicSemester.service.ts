import ApiError from "../../../errors/ApiErrors";
import { IGenericResponse, IPaginationOptions } from "../../../interfaces/pagination";
import { IAcademicSemesterFilters, academicSemesterSearchableFields, academicSemesterTitleCodeMapper } from "./academicSemester.constants";
import { IAcademicSemester } from "./academicSemester.inteface"
import { academicSemester } from "./academicSemester.model"
import { paginationHelpers } from '../../helpers/helpers';
import { SortOrder } from "mongoose";


//create Semester
const createSemester = async (payload: IAcademicSemester): Promise<IAcademicSemester> => {
    if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
        throw new ApiError(409, "Invalid Semeser Code !");
    }
    const result = await academicSemester.create(payload);
    return result;
}
// Get All Semester
const getAllsemesters = async (
    filters: IAcademicSemesterFilters,
    paginationOptions: IPaginationOptions
  ): Promise<IGenericResponse<IAcademicSemester[]>> => {
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelpers.calculatePagination(paginationOptions);
  
    const andConditions = [];
  
    if (searchTerm) {
      andConditions.push({
        $or: academicSemesterSearchableFields.map(field => ({
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        })),
      });
    }
  
    if (Object.keys(filtersData).length) {
      andConditions.push({
        $and: Object.entries(filtersData).map(([field, value]) => ({
          [field]: value,
        })),
      });
    }
  
    const sortConditions: { [key: string]: SortOrder } = {};
  
    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder;
    }
    const whereConditions =
      andConditions.length > 0 ? { $and: andConditions } : {};
  
    const result = await academicSemester.find(whereConditions)
      .sort(sortConditions)
      .skip(skip)
      .limit(limit);
  
    const total = await academicSemester.countDocuments();
  
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  };
  

const getSemesterById = async (payload: string): Promise<IAcademicSemester | null> => {
    const result = await academicSemester.findById(payload)
    return result;
}
const deleteSemesterById = async (payload: string): Promise<IAcademicSemester | null> => {
    const result = await academicSemester.findByIdAndDelete(payload)
    return result;
}

const updateSemester = async (id: string, payload: Partial<IAcademicSemester>): Promise<IAcademicSemester | null> => {
    if (
        payload.title && payload.code && academicSemesterTitleCodeMapper[payload.title] !== payload.code
    ) {
        throw new ApiError(409, "Invalid semester code!!")
    }
    const result = await academicSemester.findOneAndUpdate({ id: id }, payload)
    return result;
}

export const AcademicSemesterService = {
    createSemester,
    getAllsemesters,
    getSemesterById,
    deleteSemesterById,
    updateSemester
}
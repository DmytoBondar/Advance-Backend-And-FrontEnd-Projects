import { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiErrors";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { IGenericResponse, IPaginationOptions } from "../../../interfaces/pagination";
import { AcademicSemesterMapper, searchableFieldsList } from "./acadamicSemester.constant";
import { IAcademicSemester, ISearchInterface } from "./acadamicSemester.interface";
import { AcademicSemester } from "./acadamicSemester.model";

const createSemester = async (payload: IAcademicSemester): Promise<IAcademicSemester> => {
    if (AcademicSemesterMapper[payload.title] !== payload.code) {
        throw new ApiError(409, "Could'nt mistach title and code!")
    }
    const result = await AcademicSemester.create(payload);
    return result;
}

const getAllAcademicSemester = async (payload: IPaginationOptions, searchTerm: ISearchInterface): Promise<IGenericResponse<IAcademicSemester[]>> => {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(payload)
    const { search, ...filterableValue } = searchTerm;


    const andCondition = [];
    const searchableFeild = searchableFieldsList;

    if (search) {
        andCondition.push({
            $or: searchableFeild.map((field) => ({
                [field]: {
                    $regex: search,
                    $options: 'i'
                },
            }))
        })
    }
    if (Object.keys(filterableValue).length) {
        andCondition.push({
            $and: Object.entries(filterableValue).map(([field, value]) => (
                {
                    [field]: value
                }
            ))
        })
    }
    const sortCondition: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const whereCondition = andCondition.length > 0 ? { $and: andCondition }: {};

    const result = await AcademicSemester.find(whereCondition).sort(sortCondition).skip(skip).limit(limit);
    const total = await AcademicSemester.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
}
const getByIdAcademicSemester = async (id: string): Promise<IAcademicSemester | null> => {
    const result = await AcademicSemester.findById(id);
    return result;
}

const deleteAcademicSemester = async (id: string): Promise<IAcademicSemester | null> => {
    const result = await AcademicSemester.findByIdAndDelete(id);
    return result;
}

const updateAcademicSemester = async (id: string, payload: Partial<IAcademicSemester>): Promise<IAcademicSemester | null> => {

    if (
        payload.title && payload.code &&
        AcademicSemesterMapper[payload.title] !== payload.code) {
        throw new ApiError(409, "Could'nt mistach title and code!")
    }
    const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, { new: true })
    return result;
}
export const AcademicService = {
    createSemester,
    getAllAcademicSemester,
    getByIdAcademicSemester,
    deleteAcademicSemester,
    updateAcademicSemester
}
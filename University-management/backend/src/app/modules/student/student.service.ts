import { SortOrder } from "mongoose";
import { IPaginationOptions } from "../../../interfaces/pagination"
import { studentSearchableFields } from "./student.constant";
import { IStudent, IStudentFilter } from "./student.interface"
import { StudentModel } from "./student.model";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../faculty/faculty.interface";

const getAllStudent = async (filter: IStudentFilter, pagination: IPaginationOptions):Promise<IGenericResponse<IStudent[] | null>> => {
    const { searchTerm, ...filtersData } = filter;
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(pagination);
    const andCondition = [];

    if (Object.keys(filtersData).length) {
        Object.entries(filtersData).map(([field, value]) => ({
            [field]: value
        }))
    }

    if (searchTerm) {
        andCondition.push({
            $or: studentSearchableFields.map(fields => ({
                [fields]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            }))
        })
    }
    const sortCondtion: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
        sortCondtion[sortBy] = sortOrder
    }
    const total = await StudentModel.countDocuments();
    const whereCondtion = andCondition.length > 0 ? { $and: andCondition } : {}
    const result = await StudentModel.find(whereCondtion)
        .populate('faculty')
        .populate('acadamicDepartment')
        .populate('AcademicSemester')
        .sort(sortCondtion)
        .skip(skip)
        .limit(limit)
    return {
        data: result,
        meta: {
            page, limit, total
        }
    }
}

const getSingpleStudent = async (payload: string): Promise<IStudent | null> => {
    const result = await StudentModel.findById(payload)
        .populate('faculty')
        .populate('acadamicDepartment')
        .populate('AcademicSemester')
    return result
}

const DeleteStudent = async (payload: string): Promise<IStudent | null> => {
    const result = await StudentModel.findByIdAndDelete(payload)
        .populate('faculty')
        .populate('acadamicDepartment')
        .populate('AcademicSemester')
    return result
}

const updateStudent = async (payload: string, user: IStudent): Promise<IStudent | null> => {
    const result = await StudentModel.findOneAndUpdate({payload}, user, {new: true})
        .populate('faculty')
        .populate('acadamicDepartment')
        .populate('AcademicSemester')
    return result
}


export const StudentService = {
    getAllStudent,
    getSingpleStudent,
    DeleteStudent,
    updateStudent
}
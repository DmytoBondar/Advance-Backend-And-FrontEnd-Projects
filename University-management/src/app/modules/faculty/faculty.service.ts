import { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiErrors"
import { paginationHelper } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IFaculty, IGenericResponse } from "./faculty.interface"
import { FacultyModel } from "./faculty.model"

const createFaculty = async (payload: IFaculty): Promise<IFaculty | null> => {
    if (!payload.title) {
        throw new ApiError(400, "Title is required!");
    }
    const result = await FacultyModel.create(payload);
    return result;
};

type ISearchOptions = {
    search?: string,
    title?: string;
}

const getAllFaculty = async (pagination: IPaginationOptions, searchTerm: ISearchOptions): Promise<IGenericResponse<IFaculty[] | null>> => {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(pagination);
    const { search, title } = searchTerm;

    const andCondition = [];
    if (search) {
        andCondition.push({
            $or: [
                {
                    title: {
                        $regex: search,
                        $options: 'i'
                    }
                }]
        });
    };

    if(title){
        andCondition.push({
            $and: [{title: title}]
        })
    }
    
    

    const sortCondtion: { [key: string]: SortOrder } = {}
    if (sortBy && sortOrder) {
        sortCondtion[sortBy] = sortOrder;
    }
    const whenCondtion = andCondition.length > 0 ? { $and: andCondition } : {};
    const result = await FacultyModel.find(whenCondtion).sort(sortCondtion).skip(skip).limit(limit);
    const total = await FacultyModel.countDocuments();
    return {
        data: result,
        meta: {
            page, limit, total
        }
    };
};

const getByIdFaculty = async (payload: string): Promise<IFaculty | null> => {
    const result = await FacultyModel.findOne({ _id: payload });
    return result;
};

const deleteFaculty = async (payload: string): Promise<IFaculty | null> => {
    const result = await FacultyModel.findOneAndDelete({ _id: payload });
    return result;
};

const updateFaculty = async (id: string, payload: Partial<IFaculty>): Promise<IFaculty | null> => {
    if (!payload.title) {
        throw new ApiError(404, "Title is Required !!");
    }
    const result = await FacultyModel.findOneAndUpdate({ _id: id }, payload, { new: true });
    return result;
};

export const FacultyService = {
    createFaculty,
    getByIdFaculty,
    deleteFaculty,
    updateFaculty,
    getAllFaculty
}

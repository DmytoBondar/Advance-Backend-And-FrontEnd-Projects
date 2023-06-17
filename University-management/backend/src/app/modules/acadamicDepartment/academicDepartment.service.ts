import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { IGenericResponse, IPaginationOptions } from "../../../interfaces/pagination";
import { AcadamicDepartmentFilterFeild } from "./academicDepartment.constant";
import { IAcadamicDepartment, IAcademicDepartmentFilters } from "./academicDepartment.interface";
import { AcademicDepartmentModel } from "./academicDepartment.model";

const getAllAcadamicDepartment = async(
    filter: IAcademicDepartmentFilters,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcadamicDepartment[] | null>> => {

    const {limit, page, skip, sortBy, sortOrder} = paginationHelper.calculatePagination(paginationOptions);
    const {searchTerm, ...filtersData} = filter;
    const andCondtion = [];
    if(searchTerm){
        andCondtion.push({
            $or: AcadamicDepartmentFilterFeild.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options : 'i'
                }
            }))
        })
    }

    if(Object.keys(filtersData).length){
        andCondtion.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value
            }))
        })
    }
    const sortCondtion : {[keys: string]: SortOrder}= {}
    if(sortBy && sortOrder){
        sortCondtion[sortBy] = sortOrder
    }
    const whereCondtion = andCondtion.length > 0 ? {$and: andCondtion} : {};
    const result = await AcademicDepartmentModel.find(whereCondtion)
    .populate('acadamicFaculty')
    .sort(sortCondtion)
    .skip(skip)
    .limit(limit)
    const total = await AcademicDepartmentModel.countDocuments();

    return {
        meta: {
            page, limit, total
        },
        data: result
    };
}
const createAcadamicDeparMent = async(payload: IAcadamicDepartment): Promise<IAcadamicDepartment | null> => {
    const result = (await AcademicDepartmentModel.create(payload)).populate('acadamicFaculty');
    return result;
}
const getSingleAcadamicDepartment = async(payload: string): Promise<IAcadamicDepartment | null> => {
    const result = await AcademicDepartmentModel.findOne({_id: payload})
    return result;
}

const deleteAcadamicDepartment = async(payload: string): Promise<IAcadamicDepartment | null> => {
    const result = await AcademicDepartmentModel.findOneAndDelete({_id: payload})
    return result;
}

const udpateAcadamicDepartment = async(id:string, payload: IAcadamicDepartment): Promise<IAcadamicDepartment | null> => {
    const result = await AcademicDepartmentModel.findOneAndUpdate({_id: id}, payload, {new: true})
    return result;
}

export const AcadamicDepartMentService = {
    createAcadamicDeparMent,
    getSingleAcadamicDepartment,
    deleteAcadamicDepartment,
    udpateAcadamicDepartment,
    getAllAcadamicDepartment
}
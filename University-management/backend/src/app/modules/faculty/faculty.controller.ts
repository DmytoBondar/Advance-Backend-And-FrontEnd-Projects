import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { FacultyService } from "./faculty.service";
import pick from "../../../shared/pick";
import { paginationField } from "../../../constant/pagination";
import { IFaculty } from "./faculty.interface";

const createFaculty = catchAsync(
    async(req:Request, res:Response) => {
        const result = await FacultyService.createFaculty(req.body)
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Successfully Faculty Created !!",
            data: result
        })
    }
)
const getAllFaculty = catchAsync(
    async(req:Request, res:Response) => {
        const pagination = pick(req.query, paginationField);
        const searchTerm = pick(req.query, ['search', 'title'])

        const result = await FacultyService.getAllFaculty(pagination, searchTerm)
        sendResponse<IFaculty[]>(res, {
            statusCode: 200,
            success: true,
            message: "Successfully Get single Faculty !!",
            data: result.data,
            meta: result.meta,
        })
    }
)

const getByIdFaculty = catchAsync(
    async(req:Request, res:Response) => {
        const {id} = req.params;
        const result = await FacultyService.getByIdFaculty(id)
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Successfully Get single Faculty !!",
            data: result
        })
    }
)

const deleteFaculty = catchAsync(
    async(req:Request, res:Response) => {
        const {id} = req.params;
        await FacultyService.deleteFaculty(id)
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Successfully Deleted Faculty !!",
        })
    }
)

const updateFaculty = catchAsync(
    async(req:Request, res:Response) => {
        const {id} = req.params;
        const updateData = req.body;
        const result = await FacultyService.updateFaculty(id, updateData);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Successfully Updated Faculty !!",
            data: result
        })
    }
)

export const FacultyController = {
    createFaculty,
    getByIdFaculty,
    deleteFaculty,
    updateFaculty,
    getAllFaculty
}

import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AcadamicDepartMentService } from "./academicDepartment.service";
import pick from "../../../shared/pick";
import { IAcadamicDepartment } from "./academicDepartment.interface";
import { AcadamicDepartmentFilterFeild } from "./academicDepartment.constant";

const createAcadamicDeparMent = catchAsync(
    async(req: Request, res: Response) => {
        const {...data} = req.body;
        const result = await AcadamicDepartMentService.createAcadamicDeparMent(data)
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Successfully Created Academic Department",
            data: result
        })
    }
)

const getAllAcadamicDepartment = catchAsync(
    async(req: Request, res: Response) => {
        const filter = pick(req.query, AcadamicDepartmentFilterFeild);
        const paginationOptons = pick(req.query, ['title']);
        const result = await AcadamicDepartMentService.getAllAcadamicDepartment(filter, paginationOptons)
        sendResponse<IAcadamicDepartment[]>(res, {
            statusCode: 200,
            success: true,
            message: "Successfully Retrieve All Academic Department !!",
            data: result.data,
            meta: result.meta
        })
    }
)

const getSingleAcadamicDepartment = catchAsync(
    async(req: Request, res: Response) => {
        const {id} = req.params;
        const result = await AcadamicDepartMentService.getSingleAcadamicDepartment(id)
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Successfully Retrieve Single Academic Department !!",
            data: result
        })
    }
)

const deleteAcadamicDepartment = catchAsync(
    async(req: Request, res: Response) => {
        const {id} = req.params;
        await AcadamicDepartMentService.deleteAcadamicDepartment(id)
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Successfully Delete Academic Department !!"
        })
    }
)

const updateAcadamicDepartment = catchAsync(
    async(req: Request, res: Response) => {
        const {id} = req.params;
        const updatedData = req.body;
        const result = await AcadamicDepartMentService.udpateAcadamicDepartment(id, updatedData)
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Successfully Updated Academic Department !!",
            data: result
        })
    }
)

export const AcadamicDepartMentController = {
    createAcadamicDeparMent,
    getAllAcadamicDepartment,
    getSingleAcadamicDepartment,
    deleteAcadamicDepartment,
    updateAcadamicDepartment
}
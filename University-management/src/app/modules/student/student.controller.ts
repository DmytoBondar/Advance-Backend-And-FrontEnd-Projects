import { RequestHandler } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { studentFilterableFields } from "./student.constant";
import { paginationField } from "../../../constant/pagination";
import { StudentService } from "./student.service";
import { IStudent } from "./student.interface";

const getAllStudent: RequestHandler = catchAsync(
    async(req, res) => {
        const filters = pick(req.query, studentFilterableFields);
        const pagination = pick(req.query, paginationField);
        const result = await StudentService.getAllStudent(filters, pagination);
        sendResponse<IStudent[]>(res, {
            statusCode: 200,
            success: true,
            message: "Successfully Retrieve students data",
            data: result.data,
            meta: result.meta
        })
    }
)

const getSingleStudent: RequestHandler = catchAsync(
    async(req, res) => {
        const {id} = req.params;
        const result = await StudentService.getSingpleStudent(id);
        sendResponse<IStudent>(res, {
            statusCode: 200,
            success: true,
            message: "Successfully Retrieve student data",
            data: result
        })
    }
)

const deleteStudent: RequestHandler = catchAsync(
    async(req, res) => {
        const {id} = req.params;
        await StudentService.DeleteStudent(id);
        sendResponse<IStudent>(res, {
            statusCode: 200,
            success: true,
            message: "Successfully Delete student",
        })
    }
)

const updateStudent: RequestHandler = catchAsync(
    async(req, res) => {
        const {id} = req.params;
        const {...updateData} = req.body;
        const result = await StudentService.updateStudent(id, updateData);
        sendResponse<IStudent>(res, {
            statusCode: 200,
            success: true,
            message: "Successfully Update student",
            data: result
        })
    }
)

export const StudentController = {
    updateStudent,
    deleteStudent,
    getSingleStudent,
    getAllStudent,
}
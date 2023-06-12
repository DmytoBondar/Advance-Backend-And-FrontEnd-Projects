import { Response, Request } from 'express';
import catchAsync from "../../../shared/catchAsync";
import sendResponse from '../../../shared/sendResponse';
import { IAcademicSemester } from './academicSemester.inteface';
import { AcademicSemesterService } from './academicSemester.service';

const createSemester = catchAsync(async (req: Request, res: Response) => {
    const { ...academicSemester } = req.body;

    const result = await AcademicSemesterService.createSemester(academicSemester)

    sendResponse<IAcademicSemester>(res, {
        statusCode: 200,
        success: true,
        message: "Academic Semester created successfully !!",
        data: result,
    })
})
//Get All Semester
const getAllSemester = 
catchAsync(async (req: Request, res: Response) => {
        const result = AcademicSemesterService.getAllSemester();
        sendResponse<IAcademicSemester[]>(res, {
            statusCode: 200,
            success: true,
            message: "All Academic Semester result !!",
            data: result,
        })
    }
)
export const AcademicSemesterController = {
    createSemester,
    getAllSemester
}
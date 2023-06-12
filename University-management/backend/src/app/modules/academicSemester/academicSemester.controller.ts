import { Response, Request } from 'express';
import catchAsync from "../../../shared/catchAsync";
import sendResponse from '../../../shared/sendResponse';
import { IAcademicSemester } from './academicSemester.inteface';
import { AcademicSemesterService } from './academicSemester.service';
import pick from '../../../shared/pick';
import { paginationField } from '../../../constant/pagination';
import { academicSemesterFilterableFields } from './academicSemester.constants';

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
        const filters = pick(req.query, academicSemesterFilterableFields);
        const paginationOptions = pick(req.query, paginationField);

        const result = await AcademicSemesterService.getAllsemesters(filters, paginationOptions);
        sendResponse<IAcademicSemester[]>(res, {
            statusCode: 200,
            success: true,
            message: "All Academic Semester result !!",
            data: result.data,
            meta: result.meta,
        })
    }
    )

const getSemesterById =
    catchAsync(async (req: Request, res: Response) => {
        const id = req.params.id;
        const result = await AcademicSemesterService.getSemesterById(id);
        sendResponse<IAcademicSemester>(res, {
            statusCode: 200,
            success: true,
            message: "Cought up single semester!!",
            data: result,
        })
    }
    )

const deleteSemesterById =
    catchAsync(async (req: Request, res: Response) => {
        const id = req.params.id;
        await AcademicSemesterService.deleteSemesterById(id);
        sendResponse<IAcademicSemester>(res, {
            statusCode: 200,
            success: true,
            message: "Successfully deleted!!"
        })
    }
    )

const updateSemester = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const { academicSemester } = req.body;

    const result = await AcademicSemesterService.updateSemester(id, academicSemester)

    sendResponse<IAcademicSemester>(res, {
        statusCode: 200,
        success: true,
        message: "Academic Semester created successfully !!",
        data: result,
    })
})

export const AcademicSemesterController = {
    createSemester,
    getAllSemester,
    getSemesterById,
    deleteSemesterById,
    updateSemester
}
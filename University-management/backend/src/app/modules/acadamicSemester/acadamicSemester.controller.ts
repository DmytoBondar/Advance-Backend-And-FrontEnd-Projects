import { paginationField } from "../../../constant/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { searchTermsOptions } from "./acadamicSemester.constant";
import { IAcademicSemester } from "./acadamicSemester.interface";
import { AcademicService } from "./acadamicSemester.service";

const createAcademicSemester = catchAsync(async (req, res) => {
    const { ...academicSemister } = req.body;
    const result = await AcademicService.createSemester(academicSemister);

    sendResponse<IAcademicSemester>(res, {
        success: true,
        statusCode: 200,
        message: "Successfully created semester!",
        data: result
    })
});

const GetAllAcademicSemester =
    catchAsync(async (req, res) => {
        const search = pick(req.query, searchTermsOptions);
        const pagination = pick(req.query, paginationField);
        const result = await AcademicService.getAllAcademicSemester(pagination, search);
        sendResponse<IAcademicSemester[]>(res, {
            success: true,
            statusCode: 200,
            message: "Successfully retreiv semester data!",
            data: result.data,
            meta: result.meta
        })
    })

const GetByIdAcademicSemester =
    catchAsync(async (req, res) => {
        const {id} = req.params;
        const result = await AcademicService.getByIdAcademicSemester(id);
        sendResponse<IAcademicSemester>(res, {
            success: true,
            statusCode: 200,
            message: "Successfully retreiv semester data!",
            data: result
        })
    })

const deleteAcademicSemester =
catchAsync(async (req, res) => {
    const {id} = req.params;
    await AcademicService.deleteAcademicSemester(id);
    sendResponse<IAcademicSemester>(res, {
        success: true,
        statusCode: 200,
        message: "Successfully Deleted!",
    })
})

const updateAcademicSemester = catchAsync(async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;

    const result = await AcademicService.updateAcademicSemester(id, updateData);

    sendResponse<IAcademicSemester>(res, {
        success: true,
        statusCode: 200,
        message: "Successfully semester Updated!",
        data: result
    })
});

export const AcademicSemisterController = {
    createAcademicSemester,
    GetAllAcademicSemester,
    GetByIdAcademicSemester,
    deleteAcademicSemester,
    updateAcademicSemester
}
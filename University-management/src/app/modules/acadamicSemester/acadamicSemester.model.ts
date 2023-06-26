import { Schema, model } from "mongoose";
import { academicSemesterCode, academicSemesterTitles, academicStartMonth } from "./acadamicSemester.constant";
import { IAcademicSemester } from "./acadamicSemester.interface";
import ApiError from "../../../errors/ApiErrors";

const academicSemesterSchema = new Schema<IAcademicSemester>({
    title: {
        type: String,
        required: true,
        enum: academicSemesterTitles,
    },
    year: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        enum: academicSemesterCode,
    },
    startMonth: {
        type: String,
        required: true,
        enum: academicStartMonth,
    },
    endMonth: {
        type: String,
        required: true,
        enum: academicStartMonth,
    },
},

    {
        timestamps: true,
        toJSON: {
            virtuals: true, // to get id for better usage
        }
    }
)
// pre check Code and Title for Avoid mismatch
academicSemesterSchema.pre('save', async function (next) {
    const isExist = await AcademicSemester.findOne({
        title: this.title,
        year: this.year,
    })
    if (isExist) {
        throw new ApiError(409, "Code not save same semester within year")
    }
    next();
})

export const AcademicSemester = model<IAcademicSemester>('AcademicSemester', academicSemesterSchema)
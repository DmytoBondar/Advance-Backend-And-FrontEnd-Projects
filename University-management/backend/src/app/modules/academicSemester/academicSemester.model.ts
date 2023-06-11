import { Schema, model } from 'mongoose';
import { IAcademicSemester } from './academicSemester.inteface';
import { academicSemesterMonths, academicSemesterTitles } from './academicSemester.constants';
import ApiError from '../../../errors/ApiErrors';

const academicSemesterSchema = new Schema<IAcademicSemester>({
    title: {
        type: String,
        required: true,
        enum: academicSemesterTitles
    },
    year: { 
        type: String,
        required: true
    },
    code: { 
        type: String,
        required: true
    },
    startMonth: { 
        type: String,
        required: true,
        enum: academicSemesterMonths
    },
    endMonth: { 
        type: String,
        required: true,
        enum: academicSemesterMonths
    }

}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});

academicSemesterSchema.pre('save', async function (next){
    const isExist = await academicSemester.findOne({
        title: this.title, code : this.code
    });
    if(isExist){
        throw new ApiError(
            409, 'Academic Semester already exists !'
        )
    }
    next();
})

export const academicSemester = model<IAcademicSemester>('IAcademicSemester', academicSemesterSchema);
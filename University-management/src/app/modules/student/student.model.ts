import { Schema, model } from "mongoose";
import { IStudent, IStudentModel } from "./student.interface";
import { bloodGroupConstant, genderConstant } from "./student.constant";

const studentSchema = new Schema<IStudent, IStudentModel>({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: {
            firstName: {
                type: String,
                required: true,
            },
            middleName: {
                type: String,
            },
            lastName: {
                type: String,
                required: true,
            }
        }
    },
    gender: {
        type: String,
        enum: genderConstant,
        required: true,
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contactNo: {
        type: String,
        required: true,
    },
    emergencyContactNo: {
        type: String,
        required: true,
    },
    bloodGroup: {
        type: String,
        enum: bloodGroupConstant
    },
    presentAddress: {
        type: String,
    },
    permanentAddress: {
        type: String,
    },
    guardian: {
        type: {
            fatherName: {
                type: String,
                required: true
            },
            fatherOccupation: {
                type: String,
            },
            fatherContactNo: {
                type: String,
            },
            motherName: {
                type: String,
            },
            motherOccupation: {
                type: String,
            },
            motherContactNo: {
                type: String,
            },
            address: {
                type: String
            }
        },
    },
    localGuardian: {
        type: {
            name: {
                type: String,
                required: true
            },
            contactNo: {
                type: String,
            },
            occupation: {
                type: String,
            }
        }
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        ref: 'faculty',
        required: true
    },
    academicDepartment: {
        type: Schema.Types.ObjectId,
        ref: 'acadamicDepartment',
        required: true
    },
    academicSemester: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicSemester',
        required: true
    },
    profileImage: {
        type: String
    }
})

export const StudentModel = model<IStudent, IStudentModel>('student', studentSchema)
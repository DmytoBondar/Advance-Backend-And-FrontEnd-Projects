import { Schema, model } from "mongoose";
import { bloodGroupConstant, genderConstant } from "./faculties.constant";
import { IFacultiesUser, IFacultiesUserModel } from "./faculties.interface";

const facultiesUserSchema = new Schema<IFacultiesUser, IFacultiesUserModel>({
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
    profileImage: {
        type: String
    }
})

export const FacultiesUserModel = model<IFacultiesUser, IFacultiesUserModel>('facultiesUser', facultiesUserSchema)
import { Schema, model } from "mongoose";
import { bloodGroupConstant, genderConstant } from "./admin.constant";
import { IAdmin, IAdminModel } from "./admin.interface";

const adminSchema = new Schema<IAdmin, IAdminModel>({
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

export const AdminModel = model<IAdmin, IAdminModel>('admin', adminSchema)
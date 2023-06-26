import { Schema, model } from "mongoose";
import { IfacultyScemaModel } from "./faculty.interface";

const facultySchema = new Schema<IfacultyScemaModel>({
    title: {
        type: String,
        required: true,
        unique: true,
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
})

export const FacultyModel = model<IfacultyScemaModel>('faculty', facultySchema)
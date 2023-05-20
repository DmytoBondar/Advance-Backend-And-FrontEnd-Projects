import { IUser, IUserMethods, UserModel } from './user.interface';
import { Schema, model } from "mongoose";

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        firstName:{
            type: String,
            required: true,
        },
        middleName:{
            type: String,
        },
        lastName:{
            type: String,
            required: true,
        },
    },
    dateOfBirth: {
        type: String,
    },
    genger: {
        type: String,
        enum: ['male', 'female']
    },
    email: {
        type: String,
    },
    contactNo: {
        type: Number,
        required: true,
    },
    emergencyContactNo: {
        type: Number,
        required: true,
    },
    presentAddress: {
        type: String,
        required: true,
    },
    permanentAddress: {
        type: String,
        required: true,
    },
})

//instance methods ==> instance er methods

const User = model<IUser, UserModel>("User", userSchema);

export default User;


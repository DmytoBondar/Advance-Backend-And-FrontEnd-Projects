// import { Schema, model } from "mongoose";
// import { IAcadamicDepartment, IAcademicDepartmentModel } from "./academicDepartment.interface";

// const academicDepartmentSchema = new Schema<IAcadamicDepartment,IAcademicDepartmentModel>({
//     title: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     acadamicFaculty: {
//         type: Schema.Types.ObjectId,
//         ref: 'faculty',
//         required: true,
//     }
// }, {
//     timestamps: true,
//     toJSON: {
//         virtuals: true
//     }
// })

// export const AcademicDepartmentModel = model<IAcadamicDepartment,IAcademicDepartmentModel>('acadamicDepartment', academicDepartmentSchema);


import { Schema, model } from "mongoose";
import { IAcadamicDepartment, IAcademicDepartmentModel } from "./academicDepartment.interface";

const academicDepartmentSchema = new Schema<IAcadamicDepartment, IAcademicDepartmentModel>({
  title: {
    type: String,
    required: true,
    unique: true
  },
  acadamicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'faculty',
    required: true,
  },
  faculty: {  // Add the "faculty" field to the schema
    type: Schema.Types.ObjectId,
    ref: 'faculty',
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
})

export const AcademicDepartmentModel = model<IAcadamicDepartment, IAcademicDepartmentModel>('acadamicDepartment', academicDepartmentSchema);

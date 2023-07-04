import mongoose from 'mongoose';
import config from '../../../config'
import { AcademicSemester } from '../acadamicSemester/acadamicSemester.model';
import { IStudent } from '../student/student.interface'
import { IUser } from './users.interface'
import { generateLastFacultiesId, generateStudentId, genereateLastAdmin } from './users.utils';
import { StudentModel } from '../student/student.model';
import ApiError from '../../../errors/ApiErrors';
import { User } from './users.model';
import { IAdmin } from '../admin/admin.interface';
import { AdminModel } from '../admin/admin.model';
import { IFacultiesUser } from '../facultiesUser/faculties.interface';
import { FacultiesUserModel } from '../facultiesUser/faculties.model';

const createStudentService = async (student: IStudent, user: IUser): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }
  user.role = 'student';
  const academicSemester = await AcademicSemester.findById(student.academicSemester);

  // generate student id 
  let newUserAllData = null;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateStudentId(academicSemester);
    if (id) {
      user.id = id;
      student.id = id;
    };

    //array
    const newStudent = await StudentModel.create([student], { session });
    if (!newStudent.length) {
      throw new ApiError(404, 'Falided to create Student !!');
    };
    user.student = newStudent[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(404, 'Falided to create User !!');
    };

    newUserAllData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate(
      {
        path: 'student',
        populate: [
          {
            path: 'academicFaculty'
          },
          {
            path: 'academicDepartment'
          },
          {
            path: 'academicSemester'
          }
        ]
      }
    )
  }
  return newUserAllData;
}

const createAdminService = async (admin: IAdmin, user: IUser): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }
  user.role = 'admin';
  let allAdminData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const id = await genereateLastAdmin();
    if (id) {
      user.id = id
      admin.id = id
    }
    const createAdmin = await AdminModel.create([admin], { session });
    if (!createAdmin.length) {
      throw new ApiError(403, "Failed to create Admin")
    }
    user.admin = createAdmin[0]._id;

    const createUser = await User.create([user], { session });
    if (!createUser.length) {
      throw new ApiError(403, "Failed to create User")
    }
    allAdminData = createUser[0];
    await session.commitTransaction();
    await session.endSession();

  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new ApiError(404, "something went wrong")
  }
  if (allAdminData) {
    allAdminData = await User.findOne({ id: allAdminData.id }).populate('admin')
  }
  return allAdminData;
}

const createFacultyService = async (faculty: IFacultiesUser, user: IUser): Promise<IUser | null> => {
  if (user.password) {
    user.password = config.default_user_pass as string;
  }
  user.role = 'faculty';
  let facultyAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateLastFacultiesId();

    if (id) {
      user.id = id;
      faculty.id = id;
    }
    const createFaculty = await FacultiesUserModel.create([faculty], { session });

    if (!createFaculty.length) {
      throw new ApiError(404, "Failed to create faculties User !!");
    }
    user.faculty = createFaculty[0]._id;

    const createUser = await User.create([user], { session });
    if (!createFaculty.length) {
      throw new ApiError(404, "Failed to create faculties User !!");
    }
    facultyAllData = createUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new ApiError(404, "Failed to create faculties")
  }
  if (facultyAllData) {
    facultyAllData = await User.findOne({ _id: facultyAllData._id }).populate('faculty');
  }
  return facultyAllData;
}


const getAllUser = async():Promise<IUser[] | null> => {
  const result = await User.find()
  return result;
}

export const UserService = {
  createStudentService,
  createAdminService,
  createFacultyService,
  getAllUser
}
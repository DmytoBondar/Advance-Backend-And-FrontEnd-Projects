import { IBloodGroup } from "./student.interface";

export const genderConstant = ['male', 'female'];
export const bloodGroupConstant: IBloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
export const studentSearchableFields = ['id', 'email', 'name.firstName', 'name.lastName', 'name.middleName', 'contactNo']

export const studentFilterableFields = [
    'searchTerm',
    'id',
    'bloodGroup',
    'email',
    'contactNo',
    'emergencyContactNo',
  ];
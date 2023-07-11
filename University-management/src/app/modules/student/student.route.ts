import express from 'express';
import { StudentController } from './student.controller';
import validationRequest from '../../middlewares/validateRequest';
import { StudentValidaion } from './student.validation';

const route = express.Router();

route.patch('/', StudentController.getAllStudent);
route.get('/:id', StudentController.getSingleStudent);
route.delete('/:id', StudentController.deleteStudent);
route.patch('/:id',validationRequest(StudentValidaion.updateStudentZodSchema), StudentController.updateStudent);

export const StudentRoute = route;
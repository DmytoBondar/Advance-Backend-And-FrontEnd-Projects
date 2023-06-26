import express from 'express';
import { StudentController } from './student.route';

const route = express.Router();

route.patch('/', StudentController.getAllStudent);
route.get('/:id', StudentController.getSingleStudent);
route.delete('/:id', StudentController.deleteStudent);
route.patch('/:id', StudentController.updateStudent);

export const StudentRoute = route;
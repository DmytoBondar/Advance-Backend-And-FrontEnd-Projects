import express from 'express';
import { FacultyController } from './faculty.controller';

const route = express.Router();

route.get('/', FacultyController.getAllFaculty);
route.get('/:id', FacultyController.getByIdFaculty);
route.delete('/:id', FacultyController.deleteFaculty);
route.patch('/:id', FacultyController.updateFaculty);
route.post('/create', FacultyController.createFaculty);

export const facultyRoute = route;
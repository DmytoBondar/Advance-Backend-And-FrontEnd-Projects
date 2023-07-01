import express from 'express';
import { FacultyController } from './faculty.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const route = express.Router();

route.get('/',auth(
    ENUM_USER_ROLE.STUDENT,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY
    ), FacultyController.getAllFaculty);
route.get('/:id', FacultyController.getByIdFaculty);
route.delete('/:id', FacultyController.deleteFaculty);
route.patch('/:id', FacultyController.updateFaculty);
route.post('/create', FacultyController.createFaculty);

export const facultyRoute = route;
import express from 'express'
import { UserController } from './users.controller'
import validationRequest from '../../middlewares/validateRequest';
import { UserValidation } from './users.validation';

const router = express.Router()
router.get('/', UserController.getAllUsers);
router.post('/create-student',validationRequest(UserValidation.createUserZodSchema), UserController.createStudent);
router.post('/create-admin', validationRequest(UserValidation.createAdminZodSchema),UserController.createAdmin);
router.post('/create-faculty', validationRequest(UserValidation.createFacultyZodSchema), UserController.createFaculty);

export const UserRoute = router;

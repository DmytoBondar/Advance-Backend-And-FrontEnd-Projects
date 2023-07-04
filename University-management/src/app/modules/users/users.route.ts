import express from 'express'
import { UserController } from './users.controller'

const router = express.Router()
router.get('/', UserController.getAllUsers);
router.post('/create-student', UserController.createStudent);
router.post('/create-admin', UserController.createAdmin);
router.post('/create-faculty', UserController.createFaculty);

export const UserRoute = router;

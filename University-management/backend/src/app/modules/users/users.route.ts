import express from 'express'
import { UserController } from './users.controller'

const router = express.Router()

router.post('/create-student', UserController.createStudent)

export const UserRoute = router;

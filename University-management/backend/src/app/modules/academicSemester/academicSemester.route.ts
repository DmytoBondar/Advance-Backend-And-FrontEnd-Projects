import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';

const router = express.Router();

router.post('/create-semester', AcademicSemesterController.createSemester);

export default router;
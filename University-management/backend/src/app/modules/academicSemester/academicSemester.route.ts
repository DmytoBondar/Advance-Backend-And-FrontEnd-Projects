import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';

const router = express.Router();

router.post('/create-semester',
// validationRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema), 
AcademicSemesterController.createSemester);

//Get Single Route
router.get('/', AcademicSemesterController.getAllSemester)

export const AcademicSemesterRoutes = router;
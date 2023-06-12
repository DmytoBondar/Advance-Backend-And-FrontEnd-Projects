import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';

const router = express.Router();

router.post('/create-semester',
// validationRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema), 
AcademicSemesterController.createSemester);


router.get('/:id', AcademicSemesterController.getSemesterById);
router.get('/', AcademicSemesterController.getAllSemester);
router.delete('/:id', AcademicSemesterController.deleteSemesterById);
router.patch('/:id', AcademicSemesterController.updateSemester);

export const AcademicSemesterRoutes = router;
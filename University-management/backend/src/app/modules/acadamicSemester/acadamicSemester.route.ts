import express from 'express';
import { AcademicSemisterController } from './acadamicSemester.controller';

const route = express.Router();

route.get('/', AcademicSemisterController.GetAllAcademicSemester);
route.get('/:id', AcademicSemisterController.GetByIdAcademicSemester);
route.delete('/:id', AcademicSemisterController.deleteAcademicSemester);
route.patch('/:id', AcademicSemisterController.updateAcademicSemester);
route.post('/create', AcademicSemisterController.createAcademicSemester);

export const AcademicSemisterRoute = route;
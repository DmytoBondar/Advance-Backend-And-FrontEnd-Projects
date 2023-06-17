import express from 'express';
import { AcadamicDepartMentController } from './academicDepartment.controller';

const route = express.Router();

route.get('/', AcadamicDepartMentController.getAllAcadamicDepartment);
route.post('/create', AcadamicDepartMentController.createAcadamicDeparMent);
route.get('/:id', AcadamicDepartMentController.getSingleAcadamicDepartment);
route.patch('/:id', AcadamicDepartMentController.updateAcadamicDepartment);
route.delete('/:id', AcadamicDepartMentController.deleteAcadamicDepartment);

export const AcadamicRouter = route;
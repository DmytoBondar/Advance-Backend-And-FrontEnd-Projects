import express from 'express';
import { UserRoute } from '../users/users.route';
import { AcademicSemisterRoute } from '../acadamicSemester/acadamicSemester.route';
import { facultyRoute } from '../faculty/faculty.route';
import { AcadamicRouter } from '../acadamicDepartment/academicDepartment.route';
const router = express.Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoute
    },
    {
        path: '/academic-semester',
        route: AcademicSemisterRoute
    },
    {
        path: '/faculty',
        route: facultyRoute
    },{
        path: '/acadamic-department',
        route: AcadamicRouter
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
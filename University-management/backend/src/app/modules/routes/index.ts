import express from 'express';
import { UserRoute } from '../users/users.route';
import { AcademicSemesterRoutes } from '../academicSemester/academicSemester.route';
const router = express.Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoute
    },
    {
        path: '/academic-semester',
        route: AcademicSemesterRoutes
    },
]

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
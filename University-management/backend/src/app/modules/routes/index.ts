import express from 'express';
import { UserRoute } from '../users/users.route';
import { AcademicSemisterRoute } from '../acadamicSemester/acadamicSemester.route';
const router = express.Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoute
    },
    {
        path: '/academic-semester',
        route: AcademicSemisterRoute
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
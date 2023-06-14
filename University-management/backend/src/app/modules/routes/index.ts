import express from 'express';
import { UserRoute } from '../users/users.route';
const router = express.Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoute
    },
]

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
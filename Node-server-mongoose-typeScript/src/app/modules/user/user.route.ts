import express from 'express';
import { createUser, getUser, getUserById } from './user.controller';

const router = express.Router();

router.post('/create-user', createUser);
router.get('/', getUser);
router.get('/:id', getUserById);

export default router;
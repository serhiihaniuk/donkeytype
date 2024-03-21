//@ts-nocheck
import { Router } from 'express';
import { registerUser, loginUser, logoutUser, getUsers } from '../controllers/user.controller';
export const router = Router()

router.get('/registration', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
// router.get('/activate/:link', userController.activate);
router.get('/users', getUsers);


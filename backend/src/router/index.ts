//@ts-nocheck
import { Router } from 'express';
import UserController from '../controllers/userController';
import UserRepository from '../repositories/user';
export const authRouter = Router()

authRouter.post('/sign-up', UserController.signUp);
authRouter.post('/sign-in', UserController.signIn);
authRouter.post('/logout', UserController.logOut);
authRouter.post('/refresh', UserController.refresh);
authRouter.get('/checkUsername', UserController.checkUsername)




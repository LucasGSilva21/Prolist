import { Router } from 'express';
import AuthController from '../modules/auth/auth.controller';

const route = Router();

route.post('/login', AuthController.login);

export default route;

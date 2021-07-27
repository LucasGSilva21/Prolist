import { Router } from 'express';
import UserController from '../modules/user/user.controller';

const route = Router();

route.post('/', UserController.create);

export default route;

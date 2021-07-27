import { Request, Response } from 'express';
import UserService from './user.service';

class UserController {
    async create(request: Request, response: Response) {
        const { name, email, password } = request.body;

        const user = await UserService.create({ name, email, password });

        return response.status(201).json(user);
    }
}

export default new UserController();

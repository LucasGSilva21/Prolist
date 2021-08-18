import { Request, Response } from 'express';
import { UserService } from './user.service';

class UserController {
    constructor(private userService: UserService) {}

    async create(request: Request, response: Response) {
        const { name, email, password } = request.body;

        const user = await this.userService.create({ name, email, password });

        return response.status(201).json(user);
    }
}

export { UserController };

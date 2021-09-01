import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service';

class UserController {
    constructor(private userService: UserService) {}

    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const { name, email, password } = request.body;

            const user = await this.userService.create({ name, email, password });

            return response.status(201).json(user);
        } catch (err) {
            return next(err);
        }
    }
}

export { UserController };

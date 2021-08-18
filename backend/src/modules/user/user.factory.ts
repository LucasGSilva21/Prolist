import { getCustomRepository } from 'typeorm';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';

export const userFactory = () => {
    const userRepository = getCustomRepository(UserRepository);

    const userService = new UserService(userRepository);

    const userController = new UserController(userService);

    return userController;
}

import { getCustomRepository } from 'typeorm';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';

const makeUserRepository = () => {
    return getCustomRepository(UserRepository);
}

export const makeUserService = () => {
    const userRepository = makeUserRepository();

    return new UserService(userRepository);
}

export const makeUserController = () => {
    const userService = makeUserService();

    return new UserController(userService);
}

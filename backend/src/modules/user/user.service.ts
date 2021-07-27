import { getCustomRepository } from 'typeorm';
import { UserRepository } from './user.repository';
import { hash } from 'bcryptjs';

interface ICreateUserRequest {
    name: string;
    email: string;
    password: string;
}

class UserService {
    async create({ name, email, password }: ICreateUserRequest) {
        const userRepository = getCustomRepository(UserRepository);

        if (!email) {
            throw new Error("Email incorrect");
        }

        const userAlreadyExists = await userRepository.findOne({
            email,
        });

        if (userAlreadyExists) {
            throw new Error("User already exists");
        }

        const passwordHash = await hash(password, 8);

        const user = userRepository.create({ 
            name, 
            email,
            password: passwordHash 
        });

        await userRepository.save(user);

        return user;
    }
}

export default new UserService();

import { UserRepository } from './user.repository';
import { hash } from 'bcryptjs';
import { classToPlain } from 'class-transformer';

interface ICreateUserRequest {
    name: string;
    email: string;
    password: string;
}

class UserService {
    constructor(private userRepository: UserRepository) {}

    async findByEmail(email: string) {
        const user = await this.userRepository.findOne({
            email
        });

        return classToPlain(user);
    }

    async create({ name, email, password }: ICreateUserRequest) {
        if (!email) {
            throw new Error("Email incorrect");
        }

        const userAlreadyExists = await this.userRepository.findOne({
            email,
        });

        if (userAlreadyExists) {
            throw new Error("User already exists");
        }

        const passwordHash = await hash(password, 8);

        const user = this.userRepository.create({ 
            name, 
            email,
            password: passwordHash 
        });

        await this.userRepository.save(user);

        return user;
    }
}

export { UserService };

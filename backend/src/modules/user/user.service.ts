import { UserRepository } from './user.repository';
import { hash } from 'bcryptjs';
import { classToPlain } from 'class-transformer';
import { InvalidParamError, NotFoundError, MissingParamError } from '../../common/errors';

interface ICreateUserRequest {
    name: string;
    email: string;
    password: string;
}

interface ISaveResetPassword {
    userId: string;
    passwordResetToken: string;
    passwordResetExpires: Date;
}

interface IUpdatePassword {
    userId: string;
    newPassword: string;
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
            throw new MissingParamError('Email');
        }

        const userAlreadyExists = await this.userRepository.findOne({
            email,
        });

        if (userAlreadyExists) {
            throw new InvalidParamError('Email', 'User already exists');
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

    async saveResetPassword({ userId, passwordResetToken, passwordResetExpires }: ISaveResetPassword) {
        const user = await this.userRepository.findOne({
            id: userId
        });

        if (!user) {
            throw new NotFoundError(userId);
        }

        user.passwordResetToken = passwordResetToken;
        user.passwordResetExpires = passwordResetExpires;

        await this.userRepository.save(user);
    }

    async updatePassword({ userId, newPassword }: IUpdatePassword) {
        const user = await this.userRepository.findOne({
            id: userId
        });

        if (!user) {
            throw new NotFoundError(userId);
        }

        user.password = await hash(newPassword, 8);

        await this.userRepository.save(user);
    }
}

export { UserService };

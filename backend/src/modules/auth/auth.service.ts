import 'dotenv/config';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { UserService } from '../user/user.service';

interface IAuthRequest {
    email: string;
    password: string;
}

class AuthService {
    constructor(private userService: UserService) {}

    async login({ email, password }: IAuthRequest) {
        const user = await this.userService.findByEmail(email);

        if (!user) {
        throw new Error('Email/Password incorrect');
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
        throw new Error('Email/Password incorrect');
        }

        const token = sign(
            {
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '1d',
            }
        );

        return { token };
    }
}

export { AuthService };

import 'dotenv/config';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { UserService } from '../user/user.service';
import crypto from 'crypto';
import { EmailSender } from '../../common/helpers/mailer';

interface IAuthRequest {
    email: string;
    password: string;
}

interface IResetPasswordRequest {
    email: string;
    token: string;
    newPassword: string;
}

class AuthService {
    constructor(
        private userService: UserService,
        private emailSender: EmailSender
    ) {}

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

    async forgotPassword(email: string) {
        const user = await this.userService.findByEmail(email);

        if (!user) {
            throw new Error('User not found');
        }

        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();

        now.setHours(now.getHours() + 1);

        await this.userService.saveResetPassword({ 
            userId: user.id, 
            passwordResetToken: token, 
            passwordResetExpires: now 
        });

        this.emailSender.sendMessage(
            email,
            'Resetar senha',
            `<p>Esqueceu sua senha? Não tem problema. Utilize esse token: ${ token }</p>`, //change to link
        );
    }

    async resetPassword({ email, token, newPassword }: IResetPasswordRequest) {
        const user = await this.userService.findByEmail(email);

        if (!user) {
            throw new Error('User not found');
        }

        if (token !== user.passwordResetToken) {
            throw new Error('Token invalid');
        }

        const now = new Date();

        if (now > user.passwordResetExpires) {
            throw new Error('Token expired');
        }

        await this.userService.updatePassword({
            userId: user.id,
            newPassword
        });
    }
}

export { AuthService };

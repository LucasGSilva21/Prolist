import 'dotenv/config';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import UserService from '../user/user.service';

interface IAuthRequest {
  email: string;
  password: string;
}

class AuthService {
  async login({ email, password }: IAuthRequest) {
    const user = await UserService.findByEmail(email);

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

export default new AuthService();

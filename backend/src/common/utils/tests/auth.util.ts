import request from 'supertest';
import { Express } from 'express';

interface IUserData {
    name: string,
    email: string, 
    password: string
}

const createUserAndGetToken = async (app: Express, userData: IUserData) => {
    const { name, email, password } = userData;

    await request(app)
        .post('/users')
        .send({
            name,
            email,password
        })

    const { body } = await request(app)
        .post('/auth/login')
        .send({
            email,
            password
        });

    if(body.token) {
        return body.token;
    }

    return null;
}

export { createUserAndGetToken };

import { app } from '../../app';
import request from 'supertest';
import { Connection, getConnection } from 'typeorm';
import createConnection from '../../database';

let connection: Connection;

beforeAll(async () => {
    connection = await createConnection('login-test-connection');
    await connection.runMigrations();
});

afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
});

describe('Create Product Controller', () => {
    it('Should be able to authenticated', async () => {
        await request(app)
            .post('/users')
            .send({
                name: 'Login Valid',
                email: 'logintest@mail.com',
                password: '123456'
            })

        const response = await request(app)
            .post('/auth/login')
            .send({
                email: 'logintest@mail.com',
                password: '123456' 
            });

        expect(response.status).toBe(200);
    })
});

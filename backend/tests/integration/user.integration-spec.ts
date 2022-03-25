import { app } from '../../src/app';
import request from 'supertest';
import { Connection } from 'typeorm';
import createConnection from '../../src/database';

let connection: Connection;

beforeAll(async () => {
    connection = await createConnection('user-test-connection');
    await connection.runMigrations();
});

beforeEach(async () => {
    await connection.query('DELETE FROM users');
});

afterAll(async () => {
    await connection.close();
});

describe('Create User Controller', () => {
    it('Should be able to create an user', async () => {
        const response = await request(app)
            .post('/users')
            .send({ 
                name: 'Test Valid',
                email: 'testcreate@mail.com',
                password: '123456' 
            });

        expect(response.status).toBe(201);
    });
});

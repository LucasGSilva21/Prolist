import { app } from '../../app';
import request from 'supertest';
import { Connection, getConnection } from 'typeorm';
import createConnection from '../../database';
import { createUserAndGetToken } from '../../common/utils/tests/auth.util';

let connection: Connection;

beforeAll(async () => {
    connection = await createConnection('product-test-connection');
    await connection.runMigrations();
});

beforeEach(async () => {
    await connection.query('DELETE FROM products');
    await connection.query('DELETE FROM users');
});

afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
});

describe('List Product Controller', () => {
    it('Should be able to list a products', async () => {
        const response = await request(app)
            .get('/products');

        expect(response.status).toBe(200);
    })
});

describe('Create Product Controller', () => {
    it('Should be able to create a product', async () => {
        const token = await createUserAndGetToken(app, {
            name: 'User Test Login',
            email: 'usertestlogin@mail.com',
            password: '123456'
        });

        const response = await request(app)
            .post('/products')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Product 1' });

        expect(response.status).toBe(201);
    })
});

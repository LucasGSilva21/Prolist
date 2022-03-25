import { app } from '../../src/app';
import request from 'supertest';
import { Connection } from 'typeorm';
import createConnection from '../../src/database';
import { makeUserService } from '../../src/modules/user/user.factory';
import { UserService } from '../../src/modules/user/user.service';
import { makeAuthService } from '../../src/modules/auth/auth.factory';
import { AuthService } from '../../src/modules/auth/auth.service';

let connection: Connection;

let userService: UserService;
let authService: AuthService;

let token: string;

beforeAll(async () => {
    connection = await createConnection('product-test-connection');
    await connection.runMigrations();

    userService = makeUserService();
    authService = makeAuthService();

    await userService.create({
        name: 'User Test Login',
        email: 'usertestlogin@mail.com',
        password: '123456'
    });

    const loginResult = await authService.login({
        email: 'usertestlogin@mail.com',
        password: '123456'
    });
    token = loginResult.token;
});

beforeEach(async () => {
    await connection.query('DELETE FROM products');
});

afterAll(async () => {
    await connection.query('DELETE FROM users');
    await connection.close();
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
        const response = await request(app)
            .post('/products')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Product 1' });

        expect(response.status).toBe(201);
    })
});

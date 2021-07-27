import { app } from '../../app';
import request from 'supertest';
import { Connection, getConnection } from 'typeorm';
import createConnection from '../../database';

let connection: Connection;

beforeAll(async () => {
    connection = await createConnection('test-connection');
    await connection.runMigrations();
});

beforeEach(async () => {
    await connection.query('DELETE FROM products');
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
        const response = await request(app)
            .post('/products')
            .send({ name: 'Product 1' });

        expect(response.status).toBe(201);
    })
});

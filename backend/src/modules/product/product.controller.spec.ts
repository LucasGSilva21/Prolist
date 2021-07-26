import { app } from '../../app';
import request from 'supertest';

describe('List Product Controller', () => {
    it('Should be able to list a products', async () => {
        const response = await request(app)
            .get('/products');

        expect(response.status).toBe(200);
    })
});

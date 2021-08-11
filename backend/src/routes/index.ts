import { Router } from 'express';
import productRoutes from './product.routes';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';

const routes = Router();

routes.get('/', (req, res) => {
    res.send("Welcome!!!");
})

routes.use('/products', productRoutes);
routes.use('/users', userRoutes);
routes.use('/auth', authRoutes);

export { routes };

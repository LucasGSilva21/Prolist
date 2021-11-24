import { Router } from 'express';
import { ensureAuthenticated } from '../common/middlewares/ensure-auth.middleware';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import productRoutes from './product.routes';

const routes = Router();

routes.get('/', (req, res) => {
    res.send("Welcome!!!");
})

routes.use('/users', userRoutes);
routes.use('/auth', authRoutes);

routes.use(ensureAuthenticated);

routes.use('/products', productRoutes);

export { routes };

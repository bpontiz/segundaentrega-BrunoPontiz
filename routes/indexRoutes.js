import { Router } from 'express';
import carritoRoute from './carritoRoute.js';
import productoRoute from './productoRoute.js';

const apiRoutes = Router();

apiRoutes.use("/carrito", carritoRoute);
apiRoutes.use("/producto", productoRoute);

export default apiRoutes;
import {Router} from 'express';
import authMid from '../middlewares/auth.mid';
import { createOrder } from '../controllers/order.controller';
const router = Router();
router.use(authMid);
router.post('/create',createOrder)

export default router;
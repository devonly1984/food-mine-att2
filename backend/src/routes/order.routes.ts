import {Router} from 'express';
import authMid from '../middlewares/auth.mid';
import { createOrder, newOrderForCurrentUser, payOrder, trackOrder } from '../controllers/order.controller';
const router = Router();
router.use(authMid);
router.post('/create',createOrder)
router.get('/newOrderForCurrentUser',newOrderForCurrentUser)
router.post('/pay',payOrder);
router.get('/track/:id',trackOrder);


export default router;
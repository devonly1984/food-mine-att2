import asyncHandler from 'express-async-handler';
import { OrderModel } from '../mongodb/models/Order.model';
import { OrderStatus } from '../constants/order_status';
export const createOrder = asyncHandler(async(req:any,res:any)=> {
    const requestOrder = req.body;
    if (requestOrder.items.length <=0) {
        res.status(500).send('Cart is Empty')
        return;
    }
    await OrderModel.deleteOne({
        user: req.user.id,
        status: OrderStatus.NEW
    })
    const newOrder = new OrderModel({...requestOrder,user: req.user.id})
    await newOrder.save();
    res.send(newOrder);
})
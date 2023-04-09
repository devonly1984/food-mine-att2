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
export const newOrderForCurrentUser = asyncHandler(async(req:any,res:any)=> {
    const order = await getOrderForCurrentUser(req);
    if (order) {
        res.send(order);
    } else {
        res.status(401).send();
    }

})
export const payOrder = asyncHandler(async(req:any,res:any)=> {
    const {paymendId} = req.body;
    const order = await getOrderForCurrentUser(req);
    if (!order){
        res.status(500).send("Order not Found");
        return;
    }
    order.paymentId = paymendId;
    order.status = OrderStatus.PAID;
    await order.save();
    res.send(order._id);

})
const getOrderForCurrentUser = async(req:any)=>{
    return await OrderModel.findOne({user: req.user.id,status: OrderStatus.NEW})
}
export const trackOrder = asyncHandler(async(req:any,res: any)=> {
    const order = await OrderModel.findById(req.params.id);
    res.send(order);
})
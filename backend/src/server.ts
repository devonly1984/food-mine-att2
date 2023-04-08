import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import foodRoutes from './routes/food.routes';
import userRoutes from './routes/user.routes';
import orderRoutes from './routes/order.routes';
import dbConnect from './mongodb/database';
dotenv.config();
dbConnect();

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}))
app.use('/api/foods',foodRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);
const PORT = 5000 || process.env.PORT;
app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})